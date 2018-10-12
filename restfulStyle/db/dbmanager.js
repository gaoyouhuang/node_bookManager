var mysql = require('mysql');

exports.sqlcontrol=(sql,data,callback)=>{
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'bookmanager'
  });
  
  connection.connect();
  
  connection.query(sql,data, function (error, results, fields) {
    if (error) throw error;
    callback(results);
  });
  
  connection.end();
}