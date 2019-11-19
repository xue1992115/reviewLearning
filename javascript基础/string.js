// 属性
console.log('aaaaaaa'.length, 'length');
console.log('aaaaaaa'.constructor, 'constructor');

// 方法
console.log('aaaaaaa'.charAt(0), 'charAt');
console.log('aaaaaaa'.charCodeAt(0), 'charCodeAt');
console.log('aaaaaaa'.concat('b'), 'concat');
console.log('aaaaaaa'.includes('c'), 'includes');
console.log('c'.localeCompare('c'), 'localeCompare');
console.log('aaaaa'.match(/b?/), 'match');
// 转换成为下划线命名
var str = 'abdAbcAbc';
var newstr = str.replace(/([A-Z])/g, match => {
  return '_' + match.toLowerCase();
});
console.log(newstr, 'newstr');

var str2 = 'abd_abc_abc';
var newstr2 = str2.replace(/(_[a-z])/g, match => {
  return match.toUpperCase().slice(1);
});
console.log(newstr2, 'newstr2');

console.log('oiiibbbb'.search(/b+/, 'search'));
const h = 'aa';
console.log(h.toUpperCase(), h, 'toUpperCase');
var id = '12';
function foo() {
  console.log(this.id, 'id');
}

foo({ id: 42 });
