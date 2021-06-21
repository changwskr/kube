
var fs = require('fs');

fs.readFile('sample.txt', 'utf8', function(err, data){
  console.log(data);

});
fs.readFile('sample.txt', 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
} );




const fs1 = require('fs');
var fname = 'hello.txt'
fs.unlink(fname, (err) => {
    if( err ) {
        // throw err;
        aaa(err.message, err);
    }

    console.log(`successfully deleted ${fname}`);
});

function aaa (data, err) {
    var url= './';
    var fileName='aaa.txt';
    var encoding = 'utf8';
     
    console.log('----', err);
     fs.writeFile(url + fileName, data, encoding, function(err){
        console.log( url + fileName );
        if(err) 
            console.log('Error'+err);
        else 
            console.log("쓰기완료");
     });
}

