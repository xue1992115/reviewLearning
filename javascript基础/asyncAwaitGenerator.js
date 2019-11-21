Promise.resolve()
  .then(b => {
    console.log();
  })
  .then(c => {
      console.log();
  });


async () => {
    try{
        const resA = await Promise.resolve();
        console.log(resA, 'resA');
    } catch (e) {
        console.log(e);
    }
}
// 问题：async可以是后边的function返回一个Promise对象，有啥用啊 await是干啥用的？和generator有啥关系
/**
 * generator生成器
 */
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}
let g = gen();
console.log(g.next(), 'g'); // { value: 1, done: false }
console.log(g.next(), 'g'); // { value: 2, done: false }
console.log(g.next(), 'g'); // { value: 3, done: false }
console.log(g.next(), 'g'); // { value: 4, done: true }
/** 
 * generator生成器是每次next之后会返回一个对象
 * 每次执行都在yield之前停止，调用next之后才会进一步执行。yield相当于是一个return语句
 * 缺点是每次执行需要手动的next执行，如何实现自动的迭代执行？
 * 如何根据判断的结果，实现自动的迭代？
 * 
*/
// generator函数实现自动化的调用
// 通过递归调用生成器对象函数，直到done： false结束
function _asyncToGenerator(fn) {
    return function() {
      // this指向的是全局的对象global对象
      // 函数的参数
      var self = this,
        args = arguments;
      // 将返回值promise化，promise初始化状态为pending，执行立即执行函数
      return new Promise(function(resolve, reject) {
        // 获取迭代器实例
        // apply变更this的指向，并且立即执行
        var gen = fn.apply(self, args);
        // 执行下一步
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
        }
        // 抛出异常
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
        }
        // 第一次触发
        _next(undefined);
      });
    };
  }
  // 上一次Promise完成之后，立即执行下一步，迭代器最终结果为done：true时返回最终的结果
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        // 执行next函数，next执行完之后会返回一个对象{value: Promise, done: false}
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    // 这边判断done是否完成，完成之后变更Promise的状态
    if (info.done) {
      // 迭代器完成，将返回值（return）保存起来
      resolve(value);
    } else {
      // -- 这行代码就是精髓 --
      // 将所有值promise化
      // 比如 yield 1
      // const a = Promise.resolve(1) a 是一个 promise
      // const b = Promise.resolve(a) b 是一个 promise
      // 可以做到统一 promise 输出
      // 当 promise 执行完之后再执行下一步
      // 递归调用 next 函数，直到 done == true
      Promise.resolve(value).then(_next, _throw);
    }
  }
  // 使用函数
  const asyncFunc = _asyncToGenerator(function* () {
    console.log(1);
    yield new Promise(resolve => {
      setTimeout(() => {
        resolve();
        console.log('sleep 1s');
      }, 1000);
    });
    console.log(2);
    const a = yield Promise.resolve('a');
    console.log(3);
    const b = yield Promise.resolve('b');
    const c = yield Promise.resolve('c');
    return [a, b, c];
  })
  
  asyncFunc().then(res => {
    console.log(res, 'res');
  });
  
  // 运行结果
  // 1
  // sleep 1s
  // 2
  // 3
  // ["a", "b", "c"]


  /** 
   * 总结
   * （1）是generator函数的语法糖，generator函数是手动执行的通过手动执行next函数，执行后边的代码
   * （2）async await是自动执行的，是generator和Promise的结合
   * -  async声明的函数，会自动返回一个Promise对象
   * - Promise对象接收一个函数的参数，并且立即执行函数中的代码，及执行genertaor函数，此时阻塞在yield中。
   * - 执行next函数通过递归函数实现自动的调用，递归函数的作用意识判断函数的是否执行完成，如果执行完成则变更Promise的状态
   * - 如果没有则继续返回一个新的Promise的对象，然后执行next函数。
  */
 /** 
  * 接下来看看generator函数的实现
  * 该函数不能运行
 */
_asyncToGenerator(
    // regeneratorRuntime 这个对象是 迭代器的运行时，mark函数 将所有的变量保存在它作用域下
    regeneratorRuntime.mark(function _callee() {
      var a, d, b, c;
      // wrap 是对下面代码片段的一个包裹函数，每执行一次迭代就会调用一次 _callee$
      // _context.next, 执行完本次迭代后将指针指到下一个迭代
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // --------- ⬇⬇ 这是第一个代码片段 ⬇⬇ -----------
              console.log(1);
              _context.next = 3;
              return new Promise(function (resolve) {
                setTimeout(function () {
                  resolve();
                  console.log('sleep 1s');
                }, 1000);
              });
              // --------- ⬆⬆ 这是第一个代码片段 ⬆⬆ -----------
            case 3:
              // --------- ⬇⬇ 这是第二个代码片段 ⬇⬇ -----------
              console.log(2);
              _context.next = 9;
              return Promise.resolve('a');
              // --------- ⬆⬆ 这是第二个代码片段 ⬆⬆ -----------
              // ...
              // ... 下面以此类推每一个 yield 会被放进一个 case，作为一个代码片段，
              // ... 每次执行完就return，并且将 _context.next 指向下一个
              // ... 等待下次调用
            case 9:
              d = _context.sent;
              console.log(3);
              _context.next = 13;
              return Promise.resolve('b');
    
            case 13:
              b = _context.sent;
              _context.next = 16;
              return Promise.resolve('c');
    
            case 16:
              c = _context.sent;
              return _context.abrupt("return", [a, b, c, d]);
    
            case 18:
            case "end":
              // 最后执行 stop 结束
              return _context.stop();
          }
        }
      }, _callee);
    }));
    /** 
     * 总结generator就是首先通过regeneratorRuntime.mark变量，将所有的变量存在它的作用域下。
     * regeneratorRuntime.wrap将yield后边的代码包裹一下，每执行一次迭代就会调用一次 _callee$。
     * _context.next, 执行完本次迭代后将指针指到下一个迭代
     * 
    */

    // 参考文章https://juejin.im/post/5da5dc0b5188251189134b47 (async/await 源码实现)