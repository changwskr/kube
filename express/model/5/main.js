const { response } = require('express');
var express = require('express')
var app = express()
var fs = require('fs');
var template = require('../../lib/template.js');
 
//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function(request, response) { 
  fs.readdir('../../data', function(error, filelist){
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(filelist);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    ); 
    response.send(html);
  });
});

//http://localhost:3000/page/HTML
app.get('/page/:pageId', function(request, response) { 
    console.log(`page:${request.params.pageId}`);
    response.send(request.params);
});

//http://localhost:3000/users/100/books/200
app.get('/users/:userId/books/:bookId', (request,response) => {
    //req.params:{"userId":34, "bookId":8989}
    console.log(`userId:${request.params.userId}`);
    response.send(request.params.userId + request.params.bookId);
});
 
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});