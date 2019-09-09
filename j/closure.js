//========================= 闭包 ========================
let foo = (function() {
    let value = 0;

    return {
        increase: function(inc) {
            value += typeof inc === 'number'? inc : 1;
        },
        getValue: function() {
            return value;
        }
    }
}()); 
// 并没有把一个函数赋值给foo，是把调用该函数后返回的结果赋值给它
// 该函数返回一个包含两个方法的对象，并且这些方法继续享有访问value变量的特权。

let a = foo;
a.increase();
console.log(a.getValue()); // 1
let b = foo;
a.increase();
console.log(b.getValue()); // 2

//=======

//每time毫秒执行一次func，共执行count次
let func = function () {
    console.log(1);
}
var runFunc = function (f, time, count) {
    var foo = function () {
        if (count > 0) {
            f();
            setTimeout(foo, time, --count);
        }
    };
    setTimeout(foo, time);
};

runFunc(func, 1000, 3);