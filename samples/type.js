/*
* 判断类型的几种方法
* toString, instanceof, typeof, Array.isArray
*/

/**************** Object.prototype.toString.call() ****************
* 注意必须要用call()
* 因为 Array, Number等重写了call方法
* 得到形如 [object Object] 的字符串
* 剥离出的类型是首字母大写的，可以通过toLowerCase转换
*/

let arr = [1, 2];

let arrType = Object.prototype.toString.call(arr); // [object Array]
let reg = /[\s][\w]+/;

console.log(arrType.match(reg)[0].trim().toLowerCase()); // array


/**************************  instanceof ***************************
* 判断左边对象的 __proto__ 的链上是否包含右边对象的 prototype
* instanceof 只能用来判断对象类型，原始类型不可以
* 并且所有对象类型 instanceof Object 都是 true
* instanceof 得到的都是首字母大写的
*/

console.log(true instanceof Boolean); // false，因为无法用于判断基本类型
console.log(arr instanceof Array); // true 

// 手写 instanceof
function instanceOf(left, right) {
    let proto = left.__proto__;
    let prototype = right.prototype;
    while (proto !== null) {
        if (proto === prototype) return true;
        proto = proto.__proto__;
    }

    return false;
}

/*****************************  typeof  ****************************
 * 用于判断基本类型和 object 及 function
 * 基本类型包括 number, boolean, string, symbol, undefined
 * 判断不了 null  -> typeof null // object
 * 注意 typeof 得到的都是小写的
 * typeof 不能得到具体的 obejct 类型
*/

console.log(typeof new RegExp('1')); // object
console.log(typeof 111); // number


 
/*************************  Array.isArray()   **********************
 * es5用于判断数组类型的方法
*/
console.log(Array.isArray(arr)); // true