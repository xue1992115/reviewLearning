// 优先级：20
    // 圆括号的优先级最高 ()
// 优先级：19
    // 成员属性访问 .
    // 需要计算的成员属性访问 []
    // new运算符(带参数的)
    // 函数调用
// 优先级：18
    // new无参数的
// 优先级：17
    // ++ 后置递增
    // -- 后置递减
// 优先级：16
    // ! 逻辑非
    // ～ 按位非
    // + 一元加法 +3 会转换为数字s
    // - 一元减法 -3
    // ++ 前置递增
    // -- 前置递减
    // typeof
    // void
    // delete
    // await
// 优先级：15
    // ** 幂
// 优先级：14
    // * 乘法
    // / 除法
    // % 取模,取余
// 优先级：13
    // + 加法
    // - 减法
// 优先级：12
    // << 按位左移
    // >> 按位右移
    // >>> 无符号右移
//  优先级： 11
    //  > >= < <= in instanceof
//  优先级：10
    // ==
    // !=
    // ===
    // !==
// 优先级：9
    // & 按位与
// 优先级：8
    // ^ 按位异或
// 优先级：7
    // | 按位或
// 优先级：6
    // && 逻辑与
// 优先级：5
    // || 逻辑或
// 优先级：4
    // ？: 条件预算符
// 优先级：3
    // = 赋值
// 优先级：2
    // yield
// 优先级：1
    // ...展开元素符
// 优先级：0
    // , 逗号


// 例子
// javascript中递增递减运算符和赋值的区别
/** 
 * 
 * var num1 = 2;
 * var num2 = 20;
 * var num3 = --num1 + num2; // 21
 * var num4 = num1 + num2; // 21
 * 
 * 
 * var num1 = 2;
 * var num2 = 20;
 * var num3 = num1-- + num2; // 22
 * var num4 = num1 + num2; // 21
 * 
 * 前置和后置的区别在于前置是先计算后赋值，后置在于先赋值在计算， 但是有一个问题后置的优先级是高于赋值的，为什么是先赋值后计算
 * 根据MDN的解释，如果后置，会在递增前返回数字，如果是前置，会在递增后返回数字
*/
