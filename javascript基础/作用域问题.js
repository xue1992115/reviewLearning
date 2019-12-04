//  作用域问题，只有函数作用域，没有块级作用域
var x = 1;
console.log(x); // 1
if (true) {
    var x = 2;
    console.log(x); // 2
}
console.log(x); // 2, 因为没有块级作用域

// 创建立即执行函数
function foo() {
    var x = 1;
    if(x) {
        (function(){
            var x = 2;
            console.log(x); // 2
        })();
    }
    console.log(x); // 1
}
foo();

// 什么是立即执行函数
