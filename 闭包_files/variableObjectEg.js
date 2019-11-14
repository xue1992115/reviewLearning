// 例题一：函数上下文的对象
function foo(a, b, z) {
    // 函数的length指的是形参的个数
    console.log(foo.length, 'foo.length');
    // arguments.length指的是实参的个数
    console.log(arguments.length, 'arguments.length');
    // arguments.callee是函数自身
    console.log(arguments.callee === foo, 'callee === foo');
    z = 30;
    console.log(arguments[2], 'arguments[2]');
    console.log(z, 'z');
    // arguments中的properties-indexs内部元素的个数等于arguments.length,没有传进来的参数和properties-indexs的值是不共享的
    console.log(arguments[0], 'properties-indexs');
}
foo(1, 2, 3);
// 例题二： 进入上下文之前
function test(a, b) {
    var c = 10;
    function d() {}
    var e = function _e() {};
    (function x() {
        console.log('x');
    });
    console.log(d, 'asmdfkasd');
  }
test(2, 3);
// 例题三
function f() {} // 函数声明
var bar = function f(){} // 函数表达式,赋值语句的一部分
new function bar() {} // 表达式，因为他是new表达式
// (function(){
//     function bar(){} // 函数声明，因为是在函数体内
// })();
(function(){}); // 函数表达式：包含在分组操作符内，原因是分组操作符内，只能是表达式
// 例题四
console.log(f1());
function f1() {
    return 'Hello World';
}
// 例题五
if(true) {
    function foo(){
        console.log('first');
    }
} else {
    function foo(){
        console.log('second');
    }
}
foo(); // first
// 注意：对于不同的浏览器，对block语句中的函数语句有不同的解析，有的会解析成函数声明语句。输出的结果就是 second
// 因此建议使用函数表达式的语句
// 我们要用函数表达式
var foo;
if (true) {
  foo = function() {
    return 'first';
  };
}
else {
  foo = function() {
    return 'second';
  };
}
foo();

// 例题六
var f2 = function f3() {
    console.log(f3, 'f3'); // 可以访问f3
}
f2(); // 可以访问
// console.log(f3, 'sdas'); // 不能访问f3