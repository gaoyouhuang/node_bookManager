var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'bookmanager'
});

connection.connect();
let sql = 'delete from book where id =?';
let data = [2];
connection.query(sql,data, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
  if(results.affectedRows>0){
    console.log("成功");
  }else{
    console.log("失败");
  }
});

connection.end();