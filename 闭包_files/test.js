abc="abcdd";
var foo = {
abc:"dsfadf",
bar: function () {

console.log(this);//输出foo
console.log(this.abc);//输出dsfadf
console.log(abc);//输出abcdd
}
};
foo.bar();