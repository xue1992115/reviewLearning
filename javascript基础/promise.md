### proimse的规范
promise在规范中表示一个异步的操作的最终结果，promise就是承诺作出异步的执行或者延时计算。
promise只承诺接受首次执行resolve和reject,承诺本身状态变更后，不会再变。承诺所有通过then方法注册的函数，会依次执行。
### promise的实例化
### then函数异步回调执行
在promise的规范中，onFulFilled和onRejected方法异步执行。且应该在then方法被调用的那一轮事件循环之后的新栈中执行。这个事件队列可以采用宏任务或者微任务。
```ruby
setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function () {
  console.log('promise1');
}).then(function () {
  console.log('promise2');
});
// promise1, promise2, setTimeout。
```
### promise的三种状态
pending、FulFilled、Rejected，三种状态是不可逆的，并且是单向的
### promise的构造函数的作用
- 初始化promise的状态 pending
- 初始化then注册回调函数的处理的数组，then方法可以被同一个promise多次调用
- 立即执行传入的函数，传入promise内部resolve，reject函数
```ruby
function Promise(fn) {
    // 初始化状态
    // pending: 0
    // resolved: 1
    // rejected: 2
    this._state = 0;
    // promise的执行结果
    this.value = null;
    // then注册回调函数
    this._deferreds = [];
    // 立即执行fn函数
    try{
        fn(value => {
            resolve(this, value);
        }, reason => {
            reject(this, reason)
        })
    } catch (err) {
        reject(this, err);
    }

}
// 问题1: _deferrreds的作用是存储要回调的函数，那么是如何注册的？
问题2: 立即执行函数之后，传入promise内部的resolve和reject？？？
```
### then函数
then方法可以被多个promise多次调用，每次都返回新的promise，then方法接受两个参数，一个是Resolved，Rejected。当promise被resolve或者被reject之后。
所有的onResolved或者onRejected必须按照注册的顺序依次回调，且调用的次数不能超过1次。
- then函数之后，返回的是一个promise的对象。
- then函数注册回调函数的回调体。
- 判断当前的状态，pending状态存储deferred对象，非pending则执行onResolved和onRejected。
```ruby
Promise.prototype.then = function (onResolved, onRejected) {
  var res = new Promise(function () {});
  // 使用 onResolved，onRejected 实例化处理对象 Handler
  var deferred = new Handler(onResolved, onRejected, res);

  // 当前状态为 pending，存储延迟处理对象
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
```
```ruby
// Handler函数的作用返回onResolved和onRejected函数，并且返回新的promised
function Handler (onResolved, onRejected, promise) {
  this.onResolved = typeof onResolved === 'function' ? onResolved : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}
// 问题： 为啥返回新的Promise，而不是this
// 原因是，this指向之前的Promise实例，并且Promise的状态是不可逆的，不可迁移的，所以需要返回新的Promise，初始化状态
```
### resolve函数
该函数的作用就是改变promise的状态的，如何变更的呢？
```ruby
// promise和value是如何传入的？？？
function resolve (promise, value) {
  // 非 pending 状态不可变
  if (promise._state !== 0) return;
  
  // promise 和 value 指向同一对象
  // 对应 Promise A+ 规范 2.3.1
  if (value === promise) {
    return reject( promise, new TypeError('A promise cannot be resolved with itself.') );
  }
  
  // 如果 value 为 Promise，则使 promise 接受 value 的状态
  // 对应 Promise A+ 规范 2.3.2
  if (value && value instanceof Promise && value.then === promise.then) {
    var deferreds = promise._deferreds
    
    if (value._state === 0) {
      // value 为 pending 状态
      // 将 promise._deferreds 传递 value._deferreds
      // 偷个懒，使用 ES6 展开运算符
      // 对应 Promise A+ 规范 2.3.2.1
      value._deferreds.push(...deferreds)
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
        then.call(value, function (value) {
          resolve(promise, value);
        }, function (reason) {
          reject(promise, reason);
        })
      } catch (err) {
        reject(promise, err);
      }
      return;
    }
  }
  
  // 改变 promise 内部状态为 `resolved`
  // 对应 Promise A+ 规范 2.3.3.4、2.3.4
  promise._state = 1;
  promise._value = value;

  // promise 存在 then 注册回调函数
  if (promise._deferreds.length !== 0) {
    for (var i = 0; i < promise._deferreds.length; i++) {
      handleResolved(promise, promise._deferreds[i]);
    }
    // 清空 then 注册回调处理数组
    promise._deferreds = [];
  }
}
```
### reject函数
```ruby
function reject (promise, reason) {
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

```
### 参考文章：
https://juejin.im/post/5a30193051882503dc53af3c
解读Promise内部实现原理

