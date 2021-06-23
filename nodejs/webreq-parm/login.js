var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
const port = 3000;
var url = require('url');

var server = http.createServer(function(req, res) {

    if(req.method == 'GET'){
        ///////// http://localhost:3000/?id=ohay
        var _url = req.url; // ?id=ohayo 
        var queryData = url.parse(_url,true).query; // { id: 'ohayo' } 
        var id = queryData.id; // ohayo
        var pw = queryData.pw;
        console.log('GET',queryData);

        fs.readFile('./login.html' ,'utf8' ,function(error, data) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        });
    }
    else if(req.method == 'POST'){
        req.on('data', function(chunk){
            // console.log(chunk.toString());
            var data = querystring.parse(chunk.toString());
            console.log('POST',data);
            // console.log('ID : ' + data.id + 'PW : ' + data.pw);

            fs.readFile('./login.html' ,'utf8' ,function(error, data) {
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.end(data);
            });
        });
    }

}).listen(port, function() {
    console.log('Server is running...');
});