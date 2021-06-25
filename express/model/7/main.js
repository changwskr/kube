var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');
var template = require('../../lib/template.js');
var url = require('url');


function printReq(request){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    console.log(`_url[${_url}]`);
    console.log(`queryData.id[${queryData.id}]`);
    console.log(`pathname[${pathname}]`);

    if(request.method == 'GET'){
        ///////// http://localhost:3000/?id=ohay
        var id = queryData.id; // ohayo
        var pw = queryData.pw;
        console.log('GET',queryData);
    }
    else if(request.method == 'POST'){
        request.on('data', function(chunk){
            console.log(chunk.toString());
            var data = querystring.parse(chunk.toString());
            console.log('POST',data);
            console.log('ID : ' + data.id + 'PW : ' + data.pw);
        });
    }

}


//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function(request, response) { 
    
  printReq(request);

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
  console.log('/--------------------end',request.url);
});
 
app.get('/page/:pageId', function(request, response) { 
  fs.readdir('../../data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    console.log(`request.params.pageId[${request.params.pageId}]`);
    fs.readFile(`../../data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      /////////////
      //console.log(`sanitizedTitle[${sanitizedTitle}]`);
      //console.log(`sanitizedDescription[${sanitizedDescription}]`);

      var list = template.list(filelist);
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      response.send(html);
    });
  });
  console.log('/page/??------------------end',request.url);
});
 
app.get('/create', function(request, response){
  fs.readdir('../../data', function(error, filelist){
    var title = 'WEB - create';
    var list = template.list(filelist);
    var html = template.HTML(title, list, `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
    response.send(html);
  });
  console.log('/create--------------------end',request.url);
});


app.get('/update', function(request, response){
  fs.readdir('../../data', function(error, filelist){
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
      var title = queryData.id;
      var list = templateList(filelist);
      var template = templateHTML(title, list,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
      );
      response.writeHead(200);
      response.end(template);
    });
  });
  console.log('/update--------------------end',request.url);
});

app.get('/update/:pageId', function(request, response){
  fs.readdir('../../data', function(error, filelist){
    // console.log(`request.params.pageId[${request.params.pageId}]`);
    var filteredId = path.parse(request.params.pageId).base;
    //console.log(`filteredId[${filteredId}]`);
    fs.readFile(`../../data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p>파일명<input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>내  용
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
      );

      response.send(html);
    });
  });
  console.log('/update--------------------end',request.url);
});

app.post('/create_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`../../data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/page/${title}`});
        response.end();
      })
  });
  console.log('/create_process--------------------end',request.url);
});
 
app.get('/update/:pageId', function(request, response){
  fs.readdir('../../data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`../../data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
      );
      //위의 코드에서 /update?id=${title} 부분은 /update/${title}로 수정 되어야 하는 버그입니다. 
      response.send(html);
    });
  });
  console.log('/update/??--------------------end',request.url);
});
 
app.post('/update_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`../../data/${id}`, `../../data/${title}`, function(error){
        fs.writeFile(`../../data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/page/${title}`});
          response.end();
        })
      });
  });
  console.log('/update_process--------------------end',request.url);
});

app.post('/delete_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`../../data/${filteredId}`, function(error){
        response.redirect('/');
      })
  });
  console.log('/delete_process------------------end',request.url);

});





app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});





/*
var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');
var template = require('./lib/template.js');
 
//route, routing
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function(request, response) { 
  fs.readdir('./data', function(error, filelist){
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
 
app.get('/page/:pageId', function(request, response) { 
  fs.readdir('./data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      var list = template.list(filelist);
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      response.send(html);
    });
  });
});
 
app.get('/create', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var title = 'WEB - create';
    var list = template.list(filelist);
    var html = template.HTML(title, list, `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
    response.send(html);
  });
});
 
app.post('/create_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      })
  });
});
 
app.get('/update/:pageId', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var filteredId = path.parse(request.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = request.params.pageId;
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
      );
      //위의 코드에서 /update?id=${title} 부분은 /update/${title}로 수정 되어야 하는 버그입니다. 
      response.send(html);
    });
  });
});
 
app.post('/update_process', function(request, response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function(error){
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      });
  });
});
 
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
*/