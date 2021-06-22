var testFolder = './data';
var fs = require('fs');
 
fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})

fs.readdir('./', (err,filelist)=>{
    console.log(filelist);
})

