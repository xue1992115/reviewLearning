### 作用域链
```ruby
var x = 10;
function foo() {
    var y = 20;
    function bar(){
        console.log(x + y);
    }
    return bar;
}
foo()(); // 返回30
```
每个上下文拥有自己的变量对象；对于全局上下文，它是全局对象自身；对于函数，它是活动对象。
什么是作用域链呢？
### 作用域链
- 作用域链就是内部上下文所有的变量对象列表（包含父对象的），例如bar的上下文作用域链中就是AO（bar）、AO(foo)和VO(global)
- 创建的时间：函数调用的时候才创建的。包括AO和[[scope]]属性。
```ruby
activeExecutionContext = {
    VO: {...}, // or AO
    this: thisValue,
    Scope: [ // Scope chain
      // 所有变量对象的列表
      // for identifiers lookup
    ]
};
```
下面要先介绍以下函数的生命周期
### 函数的声明周期
- 函数的创建
```ruby
var x = 10;
 
function foo() {
  var y = 20;
  alert(x + y);
}
 
foo(); // 30
// 进入函数上下文的时候创建OA
fooContext.AO = {
  y: undefined // undefined – 进入上下文的时候是20 – at activation
};
// 另外在函数被创建的时候，给函数的属性scope存入父变量的对象层级链。存储是静态的，直至函数销毁，函数可以不调用，但是scope一直存在。
foo.[[Scope]] = [
  globalContext.VO // === Global
];
所以
```
- 函数的激活
进入上下文之后，创建AO/VO,Scope属性。
```ruby
Scope = AO|VO + [[Scope]]
等价于：
Scope = [AO].concat([[Scope]]);是指活动对象是作用域数组的第一个对象，这对于后续查找变量有帮助
```
```ruby
例题：
var x = 10;
 
function foo() {
  var y = 20;
 
  function bar() {
    var z = 30;
    alert(x +  y + z);
  }
 
  bar();
}
 
foo(); // 60
全局上下文的变量对象；
globalContext.VO === Global = {
  x: 10
  foo: <reference to function>
};
在“foo”创建时，“foo”的[[scope]]属性是：
foo.[[Scope]] = [
  globalContext.VO
];
在“foo”激活时（进入上下文），“foo”上下文的活动对象是：
fooContext.AO = {
  y: 20,
  bar: <reference to function>
};
“foo”上下文的作用域链为：
fooContext.Scope = fooContext.AO + foo.[[Scope]] // i.e.:
 
fooContext.Scope = [
  fooContext.AO,
  globalContext.VO
];
内部函数bar创建时，其[[scope]]为：
bar.[[Scope]] = [
  fooContext.AO,
  globalContext.VO
];
在“bar”激活时，“bar”上下文的活动对象为：
barContext.AO = {
  z: 30
};
barContext.Scope = barContext.AO + bar.[[Scope]] // i.e.:
barContext.Scope = [
  barContext.AO,
  fooContext.AO,
  globalContext.VO
];
对“x”、“y”、“z”的标识符解析如下：
- "x"
-- barContext.AO // not found
-- fooContext.AO // not found
-- globalContext.VO // found - 10

- "y"
-- barContext.AO // not found
-- fooContext.AO // found - 20

- "z"
-- barContext.AO // found - 30
```
### 闭包
```ruby
var x = 10;
 
function foo() {
  console.log(x);
}
 
(function () {
  var x = 20;
  foo(); // 10, but not 20
})();
```
函数的属性[[scope]]是如何创建的？是通过构造函数创建的。
```ruby
function foo() {
    console.log(x);
  }
   
  Object.prototype.x = 10;
   
  foo(); // 10
```
活动对象没有原型
### 总结
1. 函数在创建的时候就已经把parentContent.[scope]原样复制到自己的[scope]的属性中。
2. 函数在激活的时候，创建OA，然后把OA放在[scope]链条的最顶端

### 参考文章
深入理解JavaScript系列（14）：作用域链(Scope Chain)（https://www.cnblogs.com/TomXu/archive/2012/01/18/2312463.html）