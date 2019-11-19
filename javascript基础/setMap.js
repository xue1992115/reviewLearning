const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);   // 2 3 5 4
}

// 去除数组的重复成员
let array = [1,2,1,4,5,3];
[...new Set(array)]     // [1, 2, 4, 5, 3]
