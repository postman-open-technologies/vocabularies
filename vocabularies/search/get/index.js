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
      channel = event.channel;
    }    
    
    var format = '';
    if(event.format){
      format = event.format;
    }   

    const current_year = new Date().getFullYear();
    const current_month = new Date().getMonth() + 1;
    
    var sql = "SELECT v.name,v.description,v.priority,v.domain,(select MAX(save_page) FROM vocabularies_search where vocabulary = v.name) as Save_Page FROM vocabularies v";
    sql += "  WHERE name NOT IN(SELECT vocabulary FROM vocabularies_search";
    sql += " WHERE MONTH(search_month) = " + current_month + " AND YEAR(search_year) = " + current_year + "";
    sql += " AND channel = '" + channel + "'";
    sql += " AND format = '" + format + "')";
    sql += " ORDER BY Rand()";
    sql += " LIMIT 0,1";
    connection.query(sql, function (error, results, fields) {

    callback( null, results[0] );
    connection.end();

  });
});