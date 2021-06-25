var http = require('http');
var cookie = require('cookie');

// 쿠키는 두가지 종류가 존재한다
// permanent cookie, session cookie
// session cookie는 브라우저가 켜져 있는 동안만 유효한 쿠키이다.

http.createServer(function(request, response){
    console.log(request.headers.cookie);

    var cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies.yummy_cookie);
    response.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco',     //session
            'tasty_cookie=strawberry', //session
            `Permanent=cookies; Max-Age=${60*60*24*30}` //permanent
        ]
    });
    response.end('Cookie!!');
}).listen(3000);