var qs = require('querystring'); 

var app = http.createServer(function(request,response){ 
    
    var body = ''; 
    request.on('data',function (data){ 
        //request 데이터 
        body += data; 
        if (body.length > ie6){ 
            //ie 6 은 숫자 
            request.connection.destroy(); 
            // 접속끊는 함수 
        } 
    }); 
    request.on('end',function(){ 
        //data가 끝낫을경우 end         
        var post= qs.parse(body); 
        //body 를 쿼리스트링으로 형식바꿈 
        console.log(post); 
        // queryString 출력 
    })

    response.writeHead(302, {Location: `/?id=${}`}); 
    
    //요청한 주소로 리다이렉션 
    response.end('sucess'); 
});

    