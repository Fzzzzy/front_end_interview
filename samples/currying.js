/*
* 柯里化允许把函数与传递给它的参数相结合，产生出一个新的函数。
*/

let add = (function () {
    return {
        curry: function (num) {
            let addition = num;
            return function (a) {
                return a + addition;
            }
        }
    }
})();

let add1 = add.curry(1);
console.log(add1(2) + add1(3)); // 7


// 接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数
// 并且返回接受余下的参数而且返回结果的新函数

const currying = (fn, ...args) =>
    args.length < fn.length
        //参数长度不足时，重新柯里化该函数，等待接受新参数
        ? (...arguments) => currying(fn, ...args, ...arguments)
        
        //参数长度满足时，执行函数
        : fn(...args);

function sumFn(a, b, c) {
    return a + b + c;
}

var sum = currying(sumFn);
console.log(sum(2)(3)(5)); //10
console.log(sum(2, 3, 5)); //10
console.log(sum(2)(3, 5)); //10
console.log(sum(2, 3)(5)); //10
