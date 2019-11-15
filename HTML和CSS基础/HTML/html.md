## HTMl常用的标签
### html语义标签
#### 常用的标签有哪些？
- div：本身没有什么意义，主要是用于布局的。
- h1、h2、h3、h4、h5、h6，p,span,strong,em等等标签，常用于设置文本。
- ul、li、ol、dl、dt、dd设置带有列表的文本。
- form表单
- table
- img
- canvas
- a
### html语义化（元素+属性+属性值）h5中新添加的标签
#### 全局属性？
```ruby
全局属性是所有的标签共有的属性，它们可以用于所有的标签。那么常用的全局属性有哪些？
id属性：id属性主要用来定义唯一的标识符，可用于脚本的和css。
class属性：表示的元素的类名，允许css或者js通过class属性访问元素。
title属性：主要是用于提示用户该文本的信息。
<p title="菜鸟教程">菜鸟教程</p>通常是鼠标移上去的时候就会出现。
lang属性： 主要是定义内容的语言，zh，en，fr........<p lang="zh">菜鸟教程</p>
```
#### 元数据（meta-data）数据：描述数据的数据
metadata数据是一组数据，包含在head中的一组数据，最终不在浏览器中显示的一组数据。
meta中包含的数据包括：
charset：文档的字符编码，
```ruby
<meta charset="utf-8">
```
name: meta元素的类型。和content配合使用
```ruby
name配合content使用的
<meta name="author" content="Chris Mills">
author，keywords，description,coperight,
```
renderer（是给双核浏览器准备的主要是用于制定使用什么样的方式渲染页面）。
```ruby
<meta name="renderer" content="webkit"> //默认webkit内核 
```
viewreport提供视口的初始化大小，主要是给移动端使用的。
```ruby
<meta name="viewport" content="width=device-width, initial-scale=1.0">
具体的使用介绍如下：
width是设备的宽度，device-width，不设置的话默认的是980宽度
heigth是设置高度，device-height
initial-scale: 窗口的缩放大小0.0~10.0之间	
maximum：最大的缩放量
minimum：最小的缩放量
user-scalable：boolean，用户不能缩放窗口。
```
http-equive:用于模拟一个http响应头
```ruby
<meta http-equiv="参数" content="具体的描述">
http-equiv：content-type | default-style | refresh
<meta http-equiv='content-type' content='text/html; charset=UTF-8'>
// 规定使用与设定的样式
<meta http-equiv="default-style" content="the document's preferred stylesheet">
// 规定文档自动刷新，时间是300ms刷新一次。
<meta http-equiv="refresh" content="300">
```
