var mysql = require('mysql');

var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'roian',
  database:'opentutorials'
});
db.connect();
// 이 모듈을 외부로 참조하는 것을 허용한다.
module.exports = db;