### 属性
#### length
长度
#### constructor
构造函数
### 方法
#### charAt
获取某个位置上的字符串,类似于string[0],通过下标获取某个字符
#### charCodeAt
获取的某位置上字符的unicode码
#### concat
链接两个字符串，返回新的字符串
#### includes
判断是否包含字符，返回布尔值
#### startsWith
判断是否以某个字符开头
#### endsWith
判断是否以某个字符结尾
#### indexOf
但会字符所在的位置，不存在返回-1
#### lastIndexOf
返回最后一个被发现的给定值的索引值，如果没有找到则返回-1
#### localeCompare
比较两个字符的顺序，0 1 -1
#### match
使用正则表达式与字符串相比较,返回匹配的字符串。无返回空的字符串
#### padEnd
补充字符串
#### padStart
补充字符串
#### repeat
重复字符串，返回新的字符串
#### replace
替换字符串，与正则表达式关联
其中$代表的是匹配的子串，但是子串进一步处理要在一个函数中。直接处理是不起作用的。
```ruby
var str2 = "abd_abc_abc";
var newstr2 = str2.replace(/(_[a-z])/g, (match) => {
    return match.toUpperCase().slice(1);
});
```
#### search
对正则表达式和指定字符串进行匹配搜索，返回第一个出现的匹配项的下标。
#### slice
返回截取的字符串，新的字符串
#### substr
返回指定位置的子串，
#### toLowerCase
变更小写，新字符串
#### toUpperCase
变更大写，新字符串
#### trim
去空格


