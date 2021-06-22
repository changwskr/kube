var arr = ['A','B','C','D'];
console.log(arr[1]);
console.log(arr[3]);
arr[2] = 3;
console.log(arr);
console.log(arr.length);
arr.push('E');
console.log(arr);


console.log("-----")
var i=0
while (true){
    console.log(arr[i]);
    i++;
    if( i> 3) break;
}

for (var ii=1; ii < 10; ii++)
    for (var iv=1; iv < 10; iv++)
        console.log(`${ii} * ${iv}=` , ii*iv);

console.log("-1111----")


for (var ic = 0; ic < 10; ic++){ 
    // setTimeout 타이머와 같이 비동기로 동작한다 
    process.nextTick( function(){ 
        console.log(ic); // 10 
    }); 
}


var number = [1,400,12,34];
var i = 0;
var total = 0;
while(i < number.length){
  total = total + number[i];
  i = i + 1;
}
console.log(`total : ${total}`);

        