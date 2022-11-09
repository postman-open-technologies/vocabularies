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

    var content = event.content.toLowerCase();

    var sql = "SELECT * FROM vocabularies WHERE url <> '' ORDER BY name";
    connection.query(sql, function (error, results, fields) {

    var tag_matches = [];
    
    for (let i = 0; i < results.length; i++) {
      
      if(content.includes(results[i].name.toLowerCase())){
        
        var t = {};
        t.id = results[i].id
        t.name = results[i].name
        t.url = results[i].url
        tag_matches.push(t);
        
      }
      
    }

    callback( null, tag_matches );
    connection.end();
  });
});