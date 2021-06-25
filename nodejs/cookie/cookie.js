var http = require('http');


// 쿠키파일은 
// html에 setcookie라고 설정하면 된다.createServer
// 쿠키의 목적은
// 세션관리
// 개인화
// 추적
// 쿠키의 생성은
// Set-Cookie : yummy-cookie=choco
// Set-Cookie : tasty_cooky=strabery


http.createServer(function(request, response){
    // response.writeHead(200, {
    //     'Set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry'] // 배열타입으로 준다.
    // });
    response.end('Cookie!!');
}).listen(3000);