var express = require("express");
var http = require("http");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended : false }));
app.post("/login", function(req, res){
	console.log("user login");
	var uId = req.param("uId");
	var uPw = req.param("uPw");

	res.writeHead("200", {"Content-Type":"text/html;charset=utf8"});
	res.write("user uId : " + uId);
	res.write("<br>");
	res.write("userd uPw : " + uPw);
	res.write("<a href='/login_post.html'>login</a>");		

	res.end();

});



http.createServer(app).listen(3000, function() {
	console.log("server start post!!!");
});