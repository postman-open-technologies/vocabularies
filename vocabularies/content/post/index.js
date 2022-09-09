const vandium = require('vandium');
const mysql  = require('mysql');

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });

    const current_year = new Date().getFullYear();
    const current_month = new Date().getMonth() + 1;    

    var sql = 'INSERT INTO vocabularies_search(search_month,search_year,';
    
    var total_properties = Object.keys(event).length;
    
    var property_count = 1;
    for (const [key, value] of Object.entries(event)) {
      sql += key;
      if(property_count != total_properties){
        sql += ',';
      }
      property_count++;
    }
      
    sql += ')';

    sql += ' VALUES(' + current_year + ',' + current_month + ',';
    
    var property_count = 1;
    for (const [key, value] of Object.entries(event)) {
      sql += connection.escape(value);
      if(property_count != total_properties){
        sql += ',';
      }
      property_count++;
    }

    sql += ")";
  
    connection.query(sql, function (error, results, fields) {
  
      var response = {};
      response['id'] = results.insertId;
      response['name'] = event.vocabulary;

      callback( null, response );

    });
});