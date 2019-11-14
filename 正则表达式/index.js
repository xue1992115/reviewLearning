// 测试数字
const num = /^[0-9]*$/g;
console.log('3439434aa44555'.match(num), 'num1');

// 数字
const num2 = /\d{2}/;
console.log(num2.test('61'), '^\d{n}$');

const num3 = /\d{2,}/;
console.log(num2.test('619090'), '^\d{n,}$');

const num4 = /\d{2,5}/;
console.log(num2.test('619090'), '^\d{m,n}$');



