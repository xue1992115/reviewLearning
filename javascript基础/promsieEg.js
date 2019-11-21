// 例题一：用promise，输入固定的时间，输出一个文本
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
timeout(1000).then(value => {
  console.log('一秒后输出一个字符串文本');
});
// 例题二 利用async await promise输出一个文本

const asyncFunc = async () => {
  await new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

asyncFunc().then(() => {
  console.log('一秒后输出一个字符串文本');
});
// 例题三，通过Promise实现Ajax的操作
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject) {
    // 发送请求，之后请求的结果返回之后在执行resolve的回调函数，或者执行结果是Error执行reject的回调函数
    var client = new XMLHttpRequest();
    // 请求的url
    client.open('GET', url);
    // 处理请求的状态
    client.onreadystatechange = handler;
    //
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();
    function handler() {
      // 服务器端成功的处理
      if (this.reayState !== 4) {
        return;
      }
      // 处理结果为success
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
  return promise;
};
// 例题三 consle.log语句还是会执行
new Promise((resolve, reject) => {
  return resolve(1);
  console.log('resolve、reject语句的执行并不会终结promise的执行');
});

// 例题四
/**
 * promise的实例上具有then方法是因为Promise.prototype.then上具有then方法，
 * then函数执行后返回的是一个新的Promise对象，可以采用then的链式调用
 */
getJSON('/posts.json')
  .then(function(json) {
    return json.post;
  })
  .then(function(post) {});

// 例题五
/**
 * Promise.prototype.catch函数是reject函数的别名，用于处理error
 * 所以than函数中可以不需要reject函数，可以直接调用reject函数
 * 但是resolve函数之后就不会在执行reject函数了
 */

// 例题六
/**
 * Promise.all()函数，接收一个数组
 *  p1 p2 p3都是Promise组成的实例对象
 * p的执行分为两种情况
 * （1）只有p1 p2 p3 都返回fulFilled，p状态才会变成fulFilled
 * （2）p1 p2 p3其中一个变成rejected，p状态就是Rejected
 * （3）实例中如果自己定义了catch函数，就不会执行all中定义的catch函数
 */
var p = Promise.all([p1, p2, p3]);
var promises = [1, 2, 3, 4, 5, 6].map(item => {
  return getJSON('/post/');
});
Promise.all(promises)
  .then(function(posts) {
    // 只有所有的状态都是fulfilled，就执行
  })
  .catch(() => {
    // 只要有一个状态变成Rejected就执行。
  });
// 例题七
/**
 * done方法
 * promise实例在链式盗调用过程中，不论是then还是catch方法结尾，抛出的问题都有可能无法捕获，done就是捕获error并向全局抛出。
 */
asyncFunc()
  .then()
  .catch()
  .then()
  .done();

// 例题八
/**
 * finally方法
 * 和done方法最大的区别就是无论怎么样都会执行。
 */

// 例题九
/**
 * Promise.race()
 * 接收的参数也是实例组成的数组
 * 只要有一个率先改变状，p就会改变状态
 */
var p = Promise.race([p1, p2, p3]);

const pRace = Promise.race([
    fetch('/resouce/'),
    new Promise(function)(resolve, reject){
        setTimeout(()=> reject(new Error('error')), 5000);
    })
])
pRace.then(()=>{

}).catch(()=>{
    
})
