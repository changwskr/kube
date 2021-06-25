var http = require('http');
var cookie = require('cookie');

// 만약 https 상에서만 쿠키를 전송하고자 할때

http.createServer(function(request, response){
    console.log(request.headers.cookie);

    var cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
    }

    console.log(cookies.yummy_cookie);
    response.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco', 
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60*60*24*30}`, //영구존속 쿠키
            'Secure=Secure; Secure',  // https시에만 전송한다.
            'HttpOnly=HttpOnly; HttpOnly'
        ]
    });
    response.end('Cookie!!');
}).listen(3000);