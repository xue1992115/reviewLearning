var global = this;
var a = 10;
 
function foo() {}
 
console.log(foo.__parent__); // global
 
var VO = foo.__parent__;
 
console.log(VO.a); // 10
console.log(VO === global); // true
