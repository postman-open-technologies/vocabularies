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

    var sql = 'DELETE FROM vocabularies_tags WHERE vocabulary_id = ' + event.vocabulary_id + ' AND tag_id = ' + event.tag_id;
    connection.query(sql, function (error, results, fields) {

    callback( null );
    connection.end();
  });
});