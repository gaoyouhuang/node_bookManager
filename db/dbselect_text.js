var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'bookmanager'
});

connection.connect();
let sql = 'select * from book where id =?';
let data = [1];
connection.query(sql,data, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();