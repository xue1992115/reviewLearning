### 函数创建的方式
#### 函数创建的方式: 函数声明和函数表达式
 ```ruby
在ECMA规范中明确了一点就是：函数的声明必须带有identifer即函数名称，表达式则可以省略这个。
函数声明：
function 函数名称 () {}
函数表达式
function 函数名称(可选))(){}
如果都有函数名称，则根据上下文来判断是函数表达式还是函数声明。如果函数是作为表达式的一部分则是函数表达式。
如果是在函数体内或者是在程序内，则是函数声明
见： 例题三
```
```ruby
// 例题三
function f() {} // 函数声明
var bar = function f(){} // 函数表达式,赋值语句的一部分
new function bar() {} // 表达式，因为他是new表达式
// (function(){
//     function bar(){} // 函数声明，因为是在函数体内
// })();
(function(){}); // 函数表达式：包含在分组操作符内，原因是分组操作符内，只能是表达式
```
#### 这两种创建方式的区别
```ruby
那么函数表达式和函数声明之间有什么区别吗？
第一：函数声明会在任何表达式被解析和求值之前被解析和求值；
见例题四：
```
```ruby
// 例题四
console.log(f1());
function f1() {
    return 'Hello World';
}
```
#### 注意的问题
```ruby
函数声明在条件语句中的使用在注意，在block语句块的函数语句，不同的浏览器解析不同，作为函数表达式或者函数声明语句
见例题五
```
```ruby
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
注意：对于不同的浏览器，对block语句中的函数语句有不同的解析，有的会解析成函数声明语句。输出的结果就是 second
因此建议使用函数表达式的语句
我们要用函数表达式
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
```
#### 函数命名表达式
```ruby
什么是函数命名表达式？
函数必须有名字，且是表达式
var f = function foo (){}
函数命名表达式这个名字只能在新生成的函数作用域中访问，不能在外部作用域访问。
见例题六
```
```ruby
// 例题六
var f2 = function f3() {
    console.log(f3, 'f3'); // 可以访问f3
}
f2(); // 可以访问
// console.log(f3, 'sdas'); // 不能访问f3
```