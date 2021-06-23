

// 함수에 이름이 없이 변수로 저장
// callback함수의 전형형태
var f = function(){
  console.log(1+1);
  console.log(1+2);
}

function f1() {
  console.log(222);
}

var a = [f];
a[0]();  // a[0]에는 f의 참조값이 있고, 여기에 ()이것을 붙이므로서 실행하라는 의미가 된다.


var o = {
  func:f
}

o.func();


