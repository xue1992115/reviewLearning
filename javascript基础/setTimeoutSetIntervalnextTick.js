/**
 * setInterval和setTimeout之间是相似的，执行顺序按照注册的顺序执行的。
 */
/**
 * 输出的结果是随机的，时而setTimeout，setImmediate 时而是setImmediate，setTimeout
 */
setTimeout(() => {
  console.log('setTimeout');
}, 0);
setImmediate(() => {
  console.log('setImmediate');
}, 0);
/**
 * nextTick的执行机制是先于setImmediate的
 */
process.nextTick(function() {
  console.log('next tick');
});
setImmediate(function() {
  console.log('setImmediate');
});
/**
 * 浏览器的eventLoop
 * (1)javascript的运行机制
 * 一个主线程，形成执行主要是用于执行代码，
 * 任务队列，等待执行栈的同步代码执行完毕之后，系统会自动读取“任务队列”中。
 * 任务队列分为宏任务和微任务（宏任务：script，setTimeOut，setInterval，setImmediate，I/O， UI rendering）
 * 微任务：process.nextTick，Promise，Object.observe，MutationObserver
 * 事件循环的机制就是：主线程不断的从任务执行队列中读取任务执行，每执行完一个任务就检查一下微任务是否为空，执行完一个任务的具体的标志就是函数的执行栈为空。
 * 如果不为空，则一次行执行完所有的微任务，然后在进入下一个循环去任务队列中执行下一个任务。
 */
// 参见index.html例题一： 注意的是node环境的和浏览器环境的不一样
setTimeout(() => {
  console.log('setTimeout1');
  Promise.resolve().then(data => {
    console.log(222);
  });
});
setTimeout(() => {
  console.log('setTimeout2');
});
Promise.resolve().then(data => {
  console.log(111);
});
/**
 * 1、主线程中没有要执行的代码
 * 2、setTimeOut(0)作用是0ms之后，将回调函数放入宏任务队列中。（这个任务在下一次的事件循环中执行）
 * 3、接着遇到在setTimeOut(0)作用是0ms之后，将回调函数放入宏任务队列中。（这个任务在再下一次的事件循环中执行）
 * 4、首先检查微任务队列即microtask队列，发现队列不为空，执行第一个promise的then回调
 * 5、此时microtask队列为空，进入下一个事件循环, 检查宏任务队列，发现有 setTimeout的回调函数，立即执行回调函数输出 'setTimeout1',检查microtask 队列，发现队列不为空，执行promise的then回调，输出'222'，microtask队列为空，进入下一个事件循环。
 * 6、检查宏任务队列，发现有 setTimeout的回调函数, 立即执行回调函数输出'setTimeout2'。
 *
 * 问题： 微任务是什么时候放入任务队列的？
 * 一个settled状态的promise 或者已经变成settled状态(异步请求被settled)的promise，
 * 会立刻将它的callback（then）放到微任务队列里面。
 */
// 例题二
console.log('script start');

setTimeout(function() {
  console.log('setTimeout---0');
}, 0);

setTimeout(function() {
  console.log('setTimeout---200');
  setTimeout(function() {
    console.log('inner-setTimeout---0');
  });
  Promise.resolve().then(function() {
    console.log('promise5');
  });
}, 200);

Promise.resolve()
  .then(function() {
    console.log('promise1');
  })
  .then(function() {
    console.log('promise2');
  });
Promise.resolve().then(function() {
  console.log('promise3');
});
console.log('script end');

/**
 * 这里唯一疑惑的是：promise2和promise3的输出顺序，先输出promise3，后输出promise2
 * 因为执行完promise1之后，会将then回调函数继续放入任务队列里，执行promise3，这时候任务队列还是空，继续执行promise2
 */
// 为什么需要任务队列
/**
 *  JavaScript 是单线程的。单线程就意味着，所有任务需要排队，
 * 前一个任务结束，才会执行后一个任务。
 * 如果前一个任务耗时很长，后一个任务就不得不一直等着。
 * 为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，
 * 用户代理（user agent）必须使用事件循环（event loops）
 */
// 例题三
console.log('1');

setTimeout(function() {
  console.log('2');
  new Promise(function(resolve) {
    console.log('3');
    resolve();
  }).then(function() {
    console.log('4');
  });
}, 0);

new Promise(function(resolve) {
  console.log('5');
  resolve();
}).then(function() {
  console.log('6');
  setTimeout(function() {
    console.log('7');
  });
});

console.log('8');
/** 第一次循环
 * 进入执行栈执行代码，打印第一次循环主执行栈开始
 * 遇到setTimeout，将回调放入宏任务队列等待执行
 * promise声明过程是同步的，打印第一次循环主执行栈进行中...，resolve后遇到.then，将回调放入微任务队列
 * 打印第一次循环主执行栈完成
 * 检查微任务队列是否有可执行代码，有一个第三步放入的任务，打印第一次循环微任务，第一次循环结束，第一次循环结束，同时遇到setTimeout,将回调放入宏任务队列
 * 第二次循环
 * 从宏任务入手，检查宏任务队列，发现有两个宏任务，分别是第一次循环第二步和第一次循环第五步被放入的任务，先执行第一个宏任务，打印第二次循环开始，宏任务队列的第一个宏任务执行中
 * 遇到promise声明语句，打印宏任务队列的第一个宏任务继续执行,这时候又被resolve了，又会将.then中的回调放入微任务队列，这是这个宏任务队列中的第一个任务还没执行完
 * 第一个宏任务中的同步代码执行完毕，检查微任务队列，发现有一段第二步放进去的代码，执行打印第二次循环的微任务队列的微任务执行，此时第一个宏任务执行完毕
 * 开始执行第二个宏任务，打印第二次循环的宏任务队列的第二个宏任务执行，所有任务队列全部清空，执行完毕
 */

// 例题四
setImmediate(() => {
  console.log('setImmediate1');
  setImmediate(() => {
    console.log('setImmediate2');
  });
  process.nextTick(() => {
    console.log('nextTick');
  });
});

setImmediate(() => {
  console.log('setImmediate3');
});
// 打印的顺序是setImmediate1，setImmediate3，nextTick，setImmediate2
/**
 * 注意在process.nextTick是node中的异步，所以只能在node环境执行，这结果于在浏览器中的执行不一致
 * process.nextTick的执行优于promise的微任务
 */

 // 例题五
 const promise = Promise.resolve()

promise.then(() => {
  console.log('promise')
})

process.nextTick(() => {
  console.log('nextTick')
})
// nextTick  promise

// 例题六
setTimeout(() => {
  console.log(1)
}, 0)
new Promise((resolve, reject) => {
  console.log(2)
  for (let i = 0; i < 10000; i++) {
    i === 9999 && resolve()
  }
  console.log(3)
}).then(() => {
  console.log(4)
})
console.log(5)
// 2 3 5 4 1
/** 
 * new promise是个同步操作，故而输出2和3，然后执行最后一行代码输出5。
 * 接下来就是promise.then和setTimeout的问题了。
 * 我们知道promise.then和process.nextTick一样是注册在tick阶段的，
 * 而setTimeout是注册在timer阶段的，先进入tick阶段执行，
 * 然后在进入到下一个轮询的setTimeout。
 */ 

// 例题七
setImmediate(() => {
  console.log(1)
  setTimeout(() => {
      console.log(2)
  }, 100)
  setImmediate(() => {
    console.log(3)
  })
  process.nextTick(() => {
    console.log(4)
  })
})
setImmediate(() => {
  console.log(5)
  setTimeout(() => {
    console.log(6)
  }, 100)
  setImmediate(() => {
    console.log(7)
  })
  process.nextTick(() => {
    console.log(8)
  })
})
// node环境的执行顺序
// 1 5 4 8 3 7 2 6 这里的tick会合并，所以4和8连续输出
// 例题八
setImmediate(() => {
  console.log(1)
  setTimeout(() => {
    console.log(2)
  }, 100)
  setImmediate(() => {
    console.log(3)
  })
  process.nextTick(() => {
    console.log(4)
  })
})
process.nextTick(() => {
  console.log(5)
  setTimeout(() => {
    console.log(6)
  }, 100)
  setImmediate(() => {
    console.log(7)
  })
  process.nextTick(() => {
    console.log(8)
  })
})
console.log(9)
//node的执行环境问题 9 5 8 1 7 4 3 6 2