var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'bookmanager'
});

connection.connect();
let sql = 'insert into book set name=?,author=?,classify=?,content=? ';
let data = ["add_name","add_author","add_classify","add_content"];
connection.query(sql,data, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();