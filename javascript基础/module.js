/**  
 * es6的模块加载
 * Common.js
 * AMD.js
 * UMD.js
 * 
*/
// import React, { Component } from React; 这两种导入模式的差别
// export的命令
export var firstName = 'firstName';
export var lastName = 'lastName';
export var year = 1983;

// 报错
export 1
// 报错
var m = 1;
export m;
// 正确,需要在接口名和模块内部建立衣衣对应的关系
var m = 1;
export { m };
// 函数导出
function f() {

}
export { f }
// 或者
export function(){}

// import命令
import { firstName, lastName, year} from './file.js';
import * as File from './file.js';

// export default命令,对于默认导出的模块，我们可以起一个任意的名字，指向默认导出模块
export default function(){

}

import customName from './customName';

// 所以上述的import React的导入方式是默认的导入方式
// import { Component} 导入方式是导入对应的Component模块

/** 
 * common.js的加载方式和es6的加载方式的区别
*/
// 浏览器的加载方法
<script type="application/javascript">
    module/code
</script>