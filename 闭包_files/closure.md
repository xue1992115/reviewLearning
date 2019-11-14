###  闭包
先介绍几个概念，什么是函数式参数
#### 函数式参数
函数式参数就是把函数当作参数传递给其他的函数或者其他的高阶函数。
```ruby
function exampleFunc(funArg) {
  funArg();
}
exampleFunc(function () {
  console.log('funArg');
});
```
#### Funarg问题
在面向堆栈编程语言中，函数的局部变量是保存在栈上的，每当函数激活的时候，这些变量和函数参数都会都会被压入栈中的。函数返回的时候，这些参数就会从栈中移除。这种模型对将函数作为函数式值使用的时候有很大的限制。比方说作为返回值从父函数中返回的时候。绝大部分问题会出现在当函数有自由变量的时候。
自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量
```ruby
function testFn() {
  var localVar = 10;
  function innerFn(innerParam) {
    alert(innerParam + localVar);
  }
  return innerFn;
}
var someFn = testFn();
someFn(20); // 30
```
为了解决这类的问题，引入了闭包的概念
#### 闭包
```ruby
var x = 20;
function foo() {
  alert(x); // 自由变量"x" == 20
}
// 为foo闭包
fooClosure = {
  call: foo // 引用到function
  lexicalEnvironment: {x: 20} // 搜索上下文的上下文
};
```
对于闭包中变量在栈的存储和之前的存储方式是不一样的。所以这种情况下，上层作用域的闭包是通过动态分配内存的方式实现的(基于堆的实现)
#### 所有的对象都引用一个[scope]
这里要注意的是：在ECMAScript中，同一个父上下文创建的闭包是共用一个[scope]属性的。也就是说，某个闭包对其中的[scope]中的变量作出修改的时候，其他闭包在读取的是时候，变量是修改过的。
所以说所有的函数共享同一个父作用域
```ruby
var data = [];

for (var k = 0; k < 3; k++) {
  data[k] = function () {
    alert(k);
  };
}

data[0](); // 3, 而不是0
data[1](); // 3, 而不是1
data[2](); // 3, 而不是2
原因是因为var声明的k是父级的变量，在访问的时候，所有的闭包共享同一个[scope]属性，因此上下文的变量k容易被改变

修改如下：使用let声明变量，let声明的变量时一个块级作用域的变量
var data = [];

for (let k = 0; k < 3; k++) {
  data[k] = function () {
    console.log(k);
  };
}

data[0](); // 0
data[1](); // 1
data[2](); // 2

还可以修改如下：创建一个闭包解决
var data = [];

for (var k = 0; k < 3; k++) {
// 闭包就是函数中返回一个函数
  data[k] = (function (k) {
    return function() {
        console.log(k);
    }
  })(k);
}

data[0](); // 0
data[1](); // 1
data[2](); // 2
这样返回函数的的[[scope]]就变成了：
data[0].[[Scope]] === [
  ... // 其它变量对象
  父级上下文中的活动对象AO: {data: [...], k: 3},
  _helper上下文中的活动对象AO: {x: 0}
];

data[1].[[Scope]] === [
  ... // 其它变量对象
  父级上下文中的活动对象AO: {data: [...], k: 3},
  _helper上下文中的活动对象AO: {x: 1}
];

data[2].[[Scope]] === [
  ... // 其它变量对象
  父级上下文中的活动对象AO: {data: [...], k: 3},
  _helper上下文中的活动对象AO: {x: 2}
];
```
