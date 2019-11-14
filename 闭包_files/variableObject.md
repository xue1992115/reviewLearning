
## 相关概念
### 变量对象：用于存储上下文中声明的对象，如变量，函数声明
1. 全局对象的形式，全局的VO，全局的VO就是全局的对象global
```ruby
VO(globalContext) = {
    a: 10,
    test: <reference to function />
};
全局对象是在进入任何上下文之前就已经创建的对象。这个对象只有一份，而且生命周期是在程序退出的那一刻终止。
全局对象在创建的时候会将Math、String、Date、parseInt...作为自身的属性。同时还有window属性是全局对象自身
```
2. 局部的形式，局部的VO是指的函数上下文的对象，例如：变量、函数、函数形参。见例题一:
```ruby
VO(test functionContext) = {
    x: 30,
    b: 20
};
```
```ruby
例题一：函数上下文的对象
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
```
函数上下文中的对象，在函数执行上下文中，VO(function text)指的是AO
AO是在进入函数上下文时刻创建的，通过函数的arguments属性初始化。arguments属性的值是arguments对象。
```
```ruby
AO = {
    arguments: <Argo>
}
```
3. 处理上下文代码的两个阶段
+ 进入执行上下文
```ruby
创建函数形参:名称和对应的值组成的对象，如果没有值就是undefined
函数声明：名称和对应的值，组成一个对象，变量对象名如果已经存在，后者会替换前者。
变量声明：名称和对应的值，组成对象，值如果没有传递就是undefined。
见例题二
```
```ruby
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
那么进入上下文时AO如下：
 AO(test) = {
  a: 10,
  b: undefined,
  c: undefined,
  d: <reference to FunctionDeclaration "d">
  e: undefined
};
进入上下文时，会根据变量的名称构建AO，x不在AO中是因为这个是函数表达式，_e同样是函数表达式，存在在AO中是因为有变量名称e。其中要注意的是对于函数表达式只能在新生成的作用域中访问这个名字，不能在外部访问这个名字。未保存的函数表达式只能在内部进行调用，不能在外部进行调用。
那么什么是函数声明？什么是函数表达式？参见namedFunctionExpress.md文章
```
```ruby
另一个例子
console.log(x); // function，另外函数没有返回值，默认的是undefined
var x = 10;
console.log(x); // 10
x = 20;
function x() {
  console.log('nihao');
  return 'hhh';
};
console.log(x); // 20
知识点：根据规范函数声明是在当进入上下文时填入的，同一周期还有一个同名的变量。那么变量的声明的顺序是在函数声明和形式参数声明之后，而且在变量的声明不会干扰VO中已经存在的同名函数和同名形参。因此VO的结构如下：
不会干扰是什么意思？？？
```
```ruby
VO = {};
VO['x] = <reference to FunctionDeclaration "x">
找到var x = 10;
如果function "x"没有已经声明的话
这时候"x"的值应该是undefined
但是这个case里变量声明没有影响同名的function的值
VO['x'] = <the value is not disturbed, still function>
```
```ruby
另外一个例子：
if (true) {
  var a = 1;
} else {
  var b = 2;
}
 
alert(a); // 1
alert(b); // undefined,不是b没有声明，而是b的值是undefined
```
+ 执行代码
```ruby
 代码执行期间，会对代码进行修改
AO['c'] = 10;
AO['e'] = <reference to FunctionExpression "_e">;
```
4. 关于变量
关于变量正确的说法是，变量只能使用var进行声明。
```ruby
a = 10; 他不是变量，只是在全局对象上创建了一个新的属性，而不是变量。
console.log(a, 'a'); // undefined
console.log(b, 'b'); // 直接报错 b is not defined
b = 10;
var a = 20;
```
原因是因为进入上下文和代码执行阶段
```ruby
VO = {
    a: undefiend
}
b不是一个变量，所以在上下文阶段b没有在变量对象中。
b只有在代码执行阶段才出现，看下边的例子
alert(a); // undefined, 这个大家都知道，
 
b = 10;
alert(b); // 10, 代码执行阶段创建
 
var a = 20;
alert(a); // 20, 代码执行阶段修改
```
变量有一个特性就是DontDelete，意思是不能用delete直接删除变量
```ruby
a = 10;
console.log(global.a); // 10
console.log(delete a); // true
console.log(a); // a is not defined
var b = 20;
console.log(b); // 20
console.log(delete b); // false
console.log(b); // 20
```
5. 特殊的实现
```ruby
var global = this;
var a = 10;
 
function foo() {}
 
console.log(foo.__parent__); // global
 
var VO = foo.__parent__;
 
console.log(VO.a); // 10
console.log(VO === global); // true
```
### 总结
变量对象：全局的变量对象、局部的变量对象
全局的变量对象存储的是全局中声明的变量（变量只有使用var声明才是变量，不使用var就是在全局对象上添加了新的属性）
和函数（是函数声明，不是函数表达式，这里要区分什么是函数声明和函数表达式）
局部变量对象是在函数中进入上下文之前的对象，用于存储变量、函数、形参。
那么整个代码的执行分为两个阶段：进入上下文阶段和代码执行
进入上下文阶段会构建OA对象，具体的要了解是如何构建的
在代码执行阶段，就是要替换代码