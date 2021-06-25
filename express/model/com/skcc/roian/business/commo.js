// primitive type
// number, string, boolean, null, undefined, symbol
let number = 1; 

// object
let obj = {
    name : 'roian',
    age : 50
};


// 함수도 하나의 object이다.
// 여기서 함수의 {}블럭내는 메모리의 특정공간에 자리잡고 있구
// 함수명이 이 메모리의 번지를 가르키고 있다.
// 그래서 object나 function은 같다고 볼수있다.

function add (a, b){
    return a + b;
}

function devide (a, b){
    return a / b;
}

function surprise (operator, a, b) {    
    const rtn = operator(a,b);
    console.log(rtn);    
}
surprise(add, 1, 2); // NaN
surprise(devide, 4, 2);

// test
let num; //undefined === false
let rtn = num && console.log(num) // undefinied === false
console.log(rtn);

// class
// class안세서 함수를 선언할 때는 function 키워드를 사용안해도 된다.
class Counter {

    // 여기서 function?의 의미는 전달해도 되고 하지 않아도 된다는 것입니다.
    // ? 없다면 필수겠죠
    constructor(runEveryFiveTimes) {
        this.counter = 0;
        // 콜백함수를 생성시 이렇게 넣어주는 것은
        // 할때마다 생성되지 않고
        // 미리 메모리공간에 잡아서 사용하기 위함이다.
        this.callback = runEveryFiveTimes;
    }

    increase() {
        this.counter ++;
        if( this.counter % 5 === 0){
            // if( this.callback ){
            //     this.callback(this.counter);
            // }
            // 간략화 시키면
            this.callback && this.callback(this.counter);

        }

            
    }
}

function printSomething(num){
    console.log( `Wow! ${num}` );
}

// 여기서 중요한 점은 class의 callback함수는 클래스를 신규생성시
// 최초에 한번 해주는 것이 좋다.

// class를  object화
const coolCounter = new Counter(printSomething);
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();

const alertCounter = new Counter(printSomething);
