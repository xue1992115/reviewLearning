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