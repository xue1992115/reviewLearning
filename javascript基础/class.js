// class的基本的语法 
/** 
 * class的定义
 * 主要是为了声明一个类
*/
// 之前的写法
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function() {
    return this.x + this.y;
}
const p = new Point(1, 2);

// 现在的写法
/** 
 * class的写法中，除了constructor之外，其他的都是在原型上定义的
 * 
 * this的指向，这里的this默认是指向实例对象的，如果单独的调用方法，则会报错
*/
class Point {
    // 构造函数的作用就是创建实例
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    toString() {
        return this.x + this.y;
    }
}

// 继承的方法 extends关键字实现继承
/**
 * 子类在继承父类的时候，必须调用父类的构造函数，要不然会因为没有自己的this而报错。
 */
class ColorPoint extends Point {
    constructor(x,y,color){
        super(x,y); // 调用父类的constructor、
        this.color = color;
    }
    toString() {};
    return this.color + super.toString();
}