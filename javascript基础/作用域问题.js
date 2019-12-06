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

// 什么是立即执行函数?
/** 
 * 声明一个匿名函数
 * 立即执行这个函数
 * （function(){}）() 
 * 函数用括号包起来是躲过浏览器的语法检查、后边的括号是执行
 * 立即执行函数的作用是：创建一个独立的作用域，这个作用域的变量，外边是访问不到的。
*/

var list = [1,2,3,4,5,6,7];
for(var i = 0; i < 8; i++){
    list[i] = function(){
        console.log(i);
    }
}
console.log(list[1]()); // 8 undefined

// 利用立即执行函数解决问题
var list2 = [1,2,3,4,5,6,7];
for(var i = 0; i < 8; i++){
    (function(i){list2[i] = function(){
        console.log(i);
    }})(i) // 将这个利用立即执行函数包裹，创建独立的作用域
}
console.log(list2[1]()); // 1 undefined

// 利用let声明块级作用域
var list3 = [1,2,3,4,5,6,7];
for(let i = 0; i < 8; i++){
    list3[i] = function(){
        console.log(i);
    } // 将这个利用立即执行函数包裹，创建独立的作用域
}
console.log(list3[1]()); // 1 undefined


// 作用域提升问题
// 变量被提升
var xx = 10;
function xx(){
    console.log('函数的声明');
};
console.log(xx); // 10
// 函数被提升, 函数分为变量式和声明式。 声明式会被提升
// 声明式会自动放在前面，并且自动执行声明和赋值语句
function test() {
    foo(); // "foo is not a function"
    bar(); // "this will run!"
    var foo = function () { // function expression assigned to local variable 'foo'
        alert("this won't run!");
    }
    function bar() { // function declaration, given the name 'bar'
        alert("this will run!");
    }
}
test();

// 等价于
function test() {
    var foo;
    var bar;
    bar = function () { // function declaration, given the name 'bar'
        alert("this will run!");
    }

    foo(); // TypeError "foo is not a function"
    bar(); // "this will run!"

    foo = function () { // function expression assigned to local variable 'foo'
        alert("this won't run!");
    }
}
test();

// 测试函数提升和变量提升
test();
function test() {
    var x = function(){}
    var x = 1;
}

// 带有命名的函数变量声明，是不会提升到作用域范围内的
var baz = function spam() {};
baz(); // vaild
spam(); // ReferenceError "spam is not defined"


