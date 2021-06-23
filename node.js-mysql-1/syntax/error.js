
var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'roian',
  database:'opentutorials'
});
db.connect();


db.query('select * from topic', (error,topic)=>{
    if(error)
        throw error;        
    else{
        console.log(topic);
        console.log("-----");
        console.log(topic[0]);
        console.log("-----");
        console.log(topic[0].id);
        console.log(topic[0].title);
        console.log(topic[0].description);
        console.log(topic[0].created);
        console.log(topic[0].author_id);
    }
});