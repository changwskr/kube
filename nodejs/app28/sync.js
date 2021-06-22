var fs = require('fs');
 
/*
//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/
 
 
console.log('A');

try {
    fs.readFile('syntax/sample.1111txt', 'utf8', (err, result)=>{
        console.log(err);
        console.log(result);        
    });
}
catch (exception) {
	console.log(exception);
}



console.log('C');