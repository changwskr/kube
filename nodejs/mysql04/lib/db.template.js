var mysql = require('mysql');

// 보안을 위해서 템플릿을 만든다.
var db = mysql.createConnection({
  host:'',
  user:'',
  password:'',
  database:''
});
db.connect();
module.exports = db;