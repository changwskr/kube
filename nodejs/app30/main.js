var http = require('http');
var fs = require('fs');
var url = require('url');
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

    if(request.url === '/post_create'){
        var body = '';
        request.on('data', function(data){
          body = body + data;
          console.log(`data-[${data}]`);
        });

        request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description
          console.log(post,title,description);
          console.log(`title-[${title}]`);
      });


    }

    response.writeHead(200);
    response.end('end');
 
});
console.log('listen');
app.listen(3000);

