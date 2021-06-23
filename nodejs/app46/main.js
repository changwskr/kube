var http = require('http');
var fs = require('fs');
var qs = require('querystring');



var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }

    if(request.url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      console.log('end');
      return;      
    }

    if(request.url == '/create_process'){
        var body = '';
        // post 방식으로 전송된 데이타를 가져오기 위한 방법은 node js에서는 어떻게 사용하는가
        // 
        request.on('data', function(data){
            console.log('data',data)
            body = body + data;
        });

        console.log('----------------2');

        request.on('end', function(){
            var post = qs.parse(body);   
        });     
        console.log('----------------3');
        response.writeHead(200);
        console.log(__dirname + ' ' + url);
        response.end(body);
        console.log('----------------4');
        return;

    }

    response.writeHead(200);
    console.log(__dirname + ' ' + url);
    response.end(fs.readFileSync(__dirname + url));
 
});
console.log('listen');
app.listen(3000);


