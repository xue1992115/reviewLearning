/**
 * Promise构造函数的作用是
 * 初始化状态
 * 注册回调函数处理数组
 * 立即执行传入的fn函数
 */
function Promise(fn) {
  // promise 状态变量
  // 0 - pending
  // 1 - resolved
  // 2 - rejected
  this._state = 0;
  // promise 执行结果
  this._value = null;
  // then(..) 注册回调处理数组
  this._deferreds = [];

  // 立即执行 fn 函数
  try {
    fn(
      value => {
        resolve(this, value);
      },
      reason => {
        reject(this, reason);
      }
    );
  } catch (err) {
    // 处理执行 fn 异常
    reject(this, err);
  }
}
/** 
 * then函数的作用是
 * （1）then函数接受两个参数。then方法可以被同一个promise调用多次，每次返回新的promise对象
 * （2）实例化空的promise对象，保持then的链式调用
 * （3）判断当前的promise的状态，如果是pending状态，存储延迟处理对象deferred, 非pending状态，执行onResolved和onRejected函数
 * （4）注册异步要执行的函数，注册在任务队列中
*/
// then函数
Promise.prototype.then = function(onResolved, onRejected) {
  var res = new Promise(function() {});
  // 使用 onResolved，onRejected 实例化处理对象 Handler
  var deferred = new Handler(onResolved, onRejected, res);

  // 当前状态为 pending，存储延迟处理对象, 并返回一个空的promise对象
  if (this._state === 0) {
    this._deferreds.push(deferred);
    return res;
  }

  // 当前 promise 状态不为 pending
  // 调用 handleResolved 执行onResolved或onRejected回调
  handleResolved(this, deferred);

  // 返回新 promise 对象，维持链式调用
  return res;
};
// 返回onResolved、onRejected函数和新的实例化的promise
function Handler(onResolved, onRejected, promise) {
  this.onResolved = typeof onResolved === 'function' ? onResolved : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}
/** 
 * resolve函数的作用
 * （1）判断并变更当前的状态，存储resolve的value值
 * （2）判断当前是否存在then注册的回调函数，若存在则一次执行。
 * 
*/
function resolve(promise, value) {
  // 非 pending 状态不可变
  if (promise._state !== 0) return;

  // promise 和 value 指向同一对象
  // 对应 Promise A+ 规范 2.3.1
  if (value === promise) {
    return reject(
      promise,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }

  // 如果 value 为 Promise，则使 promise 接受 value 的状态
  // 对应 Promise A+ 规范 2.3.2
  if (value && value instanceof Promise && value.then === promise.then) {
    var deferreds = promise._deferreds;

    if (value._state === 0) {
      // value 为 pending 状态
      // 将 promise._deferreds 传递 value._deferreds
      // 偷个懒，使用 ES6 展开运算符
      // 对应 Promise A+ 规范 2.3.2.1
      value._deferreds.push(...deferreds);
    } else if (deferreds.length !== 0) {
      // value 为 非pending 状态
      // 使用 value 作为当前 promise，执行 then 注册回调处理
      // 对应 Promise A+ 规范 2.3.2.2、2.3.2.3
      for (var i = 0; i < deferreds.length; i++) {
        handleResolved(value, deferreds[i]);
      }
      // 清空 then 注册回调处理数组
      value._deferreds = [];
    }
    return;
  }

  // value 是对象或函数
  // 对应 Promise A+ 规范 2.3.3
  if (value && (typeof value === 'object' || typeof value === 'function')) {
    try {
      // 对应 Promise A+ 规范 2.3.3.1
      var then = obj.then;
    } catch (err) {
      // 对应 Promise A+ 规范 2.3.3.2
      return reject(promise, err);
    }

    // 如果 then 是函数，将 value 作为函数的作用域 this 调用之
    // 对应 Promise A+ 规范 2.3.3.3
    if (typeof then === 'function') {
      try {
        // 执行 then 函数
        then.call(
          value,
          function(value) {
            resolve(promise, value);
          },
          function(reason) {
            reject(promise, reason);
          }
        );
      } catch (err) {
        reject(promise, err);
      }
      return;
    }
  }

  // 改变 promise 内部状态为 `resolved`
  // 对应 Promise A+ 规范 2.3.3.4、2.3.4
  // 变更promise的内部的状态
  promise._state = 1;
  // _value存储promise的结果
  promise._value = value;

  // promise 存在 then 注册回调函数，按照注册的顺序一次调用
  if (promise._deferreds.length !== 0) {
    for (var i = 0; i < promise._deferreds.length; i++) {
      handleResolved(promise, promise._deferreds[i]);
    }
    // 清空 then 注册回调处理数组
    promise._deferreds = [];
  }
}
// reject函数
/**
 * reject的作用
 * （1）判断并变更当前的状态，并存储当前的reject的值
 * （2）判断是否有then注册的函数，执行异步处理
 */
function reject(promise, reason) {
  // 非 pending 状态不可变
  if (promise._state !== 0) return;

  // 改变 promise 内部状态为 `rejected`
  promise._state = 2;
  promise._value = reason;

  // 判断是否存在 then(..) 注册回调处理
  if (promise._deferreds.length !== 0) {
    // 异步执行回调函数
    for (var i = 0; i < promise._deferreds.length; i++) {
      handleResolved(promise, promise._deferreds[i]);
    }
    promise._deferreds = [];
  }
}
// handleResolved函数
/** 
 * （1）注册异步回调函数到队列里边微任务
 * （2）执行回调函数
*/
function handleResolved(promise, deferred) {
  // 异步执行注册回调,异步的函数最主要有三种promise，setTimeOut，setImmediate
  // 将异步回调的函数放入队列里边等待执行
  asyncFn(function() {
    // 根据状态_state判断是执行onResolved函数还是执行onRejected函数
    var cb = promise._state === 1 ? deferred.onResolved : deferred.onRejected;
    // then函数中传递注册回调函数为空情况
    if (cb === null) {
      if (promise._state === 1) {
        resolve(deferred.promise, promise._value);
      } else {
        reject(deferred.promise, promise._value);
      }
      return;
    }
    // 执行注册回调操作
    try {
      var res = cb(promise._value);
      console.log(res, 'res');
    } catch (err) {
      reject(deferred.promise, err);
    }
    // 处理链式 then(..) 注册处理函数调用
    resolve(deferred.promise, res);
  });
}
// 异步立即执行函数，判断是返回promise异步还是setTimeout、setImmediate
// 然后通过判断将回调的函数放在任务队列中。
var asyncFn = (function() {
  if (
    typeof process === 'object' &&
    process !== null &&
    typeof process.nextTick === 'function'
  ) {
    return process.nextTick;
  } else if (typeof setImmediate === 'function') {
    return setImmediate;
  }
  return setTimeout;
})();

const promise = new Promise(function(resolve, reject) {
  resolve();
});

const han = promise.then(
  (value) => {
    console.log('resolved');
    console.log('value', value);
  },
  (error) => {
    console.log('rejected');
    console.log('error', error);
  }
);

/** 
 * 总结
 * Promise的构造函数（接收一个函数作为参数，该函数接收两个函数resolve，reject作为参数）
 * （1）作用是初始化状态state：0
 * （2）初始化存储异步函数的数组
 * （3）执行立即执行函数
 * 
 * then函数（接收两个函数作为参数）
 * （1）初始化一个新的对象，用于返回，保持链式调用
 * （2）注册异步处理的函数
 * 
 * resolve函数
 * （1）变更promise的状态
 * （2）判断是否存在then注册的回调函数，并调用
 * 
 * reject函数
 * （1）变更promise的状态
 * （2）判断是否存在then注册的回调函数，并执行
*/
