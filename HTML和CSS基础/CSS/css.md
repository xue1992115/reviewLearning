### background
取值可以是：颜色green,
background: content-box radial-gradient(crimson, skyblue);
background: no-repeat url("../../media/examples/lizard.png");
这是一个简写的属性。
### background-attachment决定背景图像位置在视口的状态
background-attachment：scroll，随着页面滚动而滚动
background-attachment：fixed，相对于视口固定不动
background-attachment：local，背景图片随着元素内容滚动而滚动
background-attachment: scroll, local;
### background-clip:设置背景或者图片是否延伸要边框下边
background-clip: border-box; 延伸到边框下
background-clip: padding-box; 延伸到padding的区域
background-clip: content-box; 延伸到内容的区域
background-clip: text; 延伸到文本
### background-color: 背景颜色
### background-image:背景图片
background-image: url("../../media/examples/lizard.png");
### background-origin：设置背景图片的相对位置
background-origin: border-box， 背景图片相对于border放置
background-origin: padding-box，背景图片相对于padding放置
background-origin: content-box，背景图片相对于content放置
注意：当使用 background-attachment 为fixed时，该属性将被忽略不起作用。
### background-position：设置背景的初始位置，这个位置是相对于由 background-origin 定义的位置图层的。
background-position: top;垂直顶端设置 水平居中
background-position: left; 水平左边，上下是居中
background-position: center; 上下居中 左右居中
background-position: 25% 75%; 百分比设置
同样延伸出：background-position-x
background-position-y
### background-repeat: 背景图像重复的方式
background-repeat: repeat-x; x轴重复 最后一个对象会被剪裁
background-repeat: repeat-y;y轴重复 最后一个对象会被剪裁
background-repeat: repeat;x y轴重复 最后一个对象会被剪裁
background-repeat: round;
background-repeat: space;第一个元素和最后一个元素会贴边，中间会均匀分布，中间或许有间隔。不会裁剪，但是一个图片也放不下的时候会裁剪
background-repeat: no-repeat; 不重复
background-repeat: space repeat;最后一个对象会被裁剪
### background-size：设置背景图片的大小，两个值的时候指定的是宽度和高度
background-size: contain; 背景图片放在背景区域，会repeat

background-size: contain; 背景图片放在背景区域，会留空白
background-repeat: no-repeat;

background-size: cover;背景图片覆盖背景区域
background-size: 30%; 设置图片的百分比
background-size: 200px 100px; 设置背景图片的宽高

### border边框 简写，扩展如下
border-width：边框的宽度
border-style: 边框的样式
border-color： 边框的颜色
可以分别设置上下左右边框的宽度样式和颜色

### border-radius设置外边框的圆角
border-radius: 30px; 四个角
border-radius: 25% 10%; 两个斜对角的值是一样的
border-radius: 10% 30% 50% 70%; 分别设置四个角
border-radius: 10px 100px / 120px;
border-radius: 50% 20% / 10% 40%;
### border-shadow:元素框架上添加阴影效果，可以设置x，y阴影模糊半径、阴影扩散半径、和阴影颜色
box-shadow: 10px 5px 5px red; 可以是负值

