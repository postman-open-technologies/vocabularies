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
    
    var channel = '';
    if(event.channel){
      search = event.channel;
    }    
    
    var format = '';
    if(event.format){
      tags = event.format;
    }   

    const current_year = new Date().getFullYear();
    const current_month = new Date().getMonth() + 1;
    
    var sql = "SELECT * FROM vocabularies v";
    sql +'  WHERE name IS NOT IN(SELECT vocabulary FROM vocabularies_search";
    sql += " AND MONTH(v.search_month) = " + current_month + " AND YEAR(v.search_year) = " + current_year + "";
    sql += " AND v.channel = '" + channel + "'";
    sql += " AND v.format = '" + format + "'";
    sql += " ORDER BY Rand()";
    sql += " LIMIT 0,1";
    connection.query(sql, function (error, results, fields) {

    callback( null, results );

  });
});