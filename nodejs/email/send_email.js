// @breif nodemailer 모듈추출

const nodemailer = require( "nodemailer" );



// @details 글로벌 범위에서 대기할 수 없으므로 래퍼( wrapper )를 사용해야 함

async function main() {

    // @breif 기본 SMTP 전송을 사용하여 재사용 가능한 전송 개체 생성
    const transporter = nodemailer.createTransport({
          host : "smtp.naver.com"      // @details  네이버(smtp.naver.com), 구글(smtp.google.com), 다음(smtp.daum.net) 등
        , port : 465
        , secure : true                     // @details PORT가 465인 경우 TRUE로 설정, 다른 경우 FALSE
        , auth : {
              user : "changwskr@naver.com"
            , pass : "!1974yoe0"
        }
    });

    // @breif 발송할 메일의 컨테츠 정보
    let info = await transporter.sendMail({
          from : "\"Fred Foo 👻\" <changwskr@naver.com>"         // @details 보내는 사람 메일주소( user 메일주소와 일치해야함 )
        , to : "changwskr@naver.com, changwskr@gmail.com"                // @details 받는이(들) 메일주소
        , subject : "Node.js 메일전송 테스트 ✔"                           // @details 메일주소
        , text : "HTML 속성이 활성화 되어 있으면 비활성화 됨"         // @details 메일 내용
        , html : "<h1>사악미소의 현대마법의 IT 공방</h1>"            // @details 메일 내용(HTML)
    });

    console.log("Message sent : %s", info.messageId);
}



// @breif main() 함수를 실행

main().catch( console.error );