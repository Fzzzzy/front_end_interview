// //求数组交集

// let a1 = [1, 3, 6, 4, 4];
// let a2 = [6, 0, 2, 1, 4];
// let a3 = [9, 1, 4];

// function findJoin(...rest) {
//     if (rest.length === 0) return [];
//     return Array.from(rest.reduce((result, arr) => {
//         return new Set(result.filter(item => arr.includes(item)))
//     }))
// }

// console.log(findJoin(a1, a2));

// /** 
//  * 实现 a == 1 && a == 2 && a == 3
//  * 重写隐式转换调用的 toString 或 valueOf 
//  * Symbol.toPrimitive 的优先级最高
// */ 

// let a = {
//     i: 1,
//     toString() {
//         return a.i++;
//     },
//     valueOf() {
//         return a.i++;
//     },
//     [Symbol.toPrimitive]() {
//         return a.i++;
//     }
// };

// 同理使用generator
// let a = {
//     gn: (function* () {
//         yield 1;
//         yield 2;
//         yield 3;
//     })(),
//     valueOf() {
//         return a.gn.next().value;
//     }
// }

// console.log(a == 1 && a == 2 && a == 3);

// // 实现 (5).add(3).minus(2) = 6
// Number.prototype.add = function(n) {
//     return this.valueOf() + n;
// }

// Number.prototype.minus = function(n){
//     return this.valueOf() - n;
// }
// console.log((5).add(3).minus(2));

// function shift(a, k) {
//     k %= a.length;
//     let pre = a.splice(0, k + 1);
//     return a.concat(pre);
// }

// console.log(shift([1, 2, 3, 4, 5, 6, 7], 3))

// function shift(arr) {
//     let length = arr.length;
//     arr = arr.filter(item => item != 0);
//     for (let i = arr.length; i < length; i++) {
//         arr.push(0);
//     }
//     return arr;
// }

// console.log(shift([0,1,0,0, 0,3,12,120]));

// function find(arr, target) {
//     let obj = {};
//     arr.map((item, idx) => {
//         obj[item] = idx;
//     });

//     for (let key in obj) {
//         let remain = target - key;
//         if (obj[remain] && obj[remain] != obj[key]) return [obj[key], obj[remain]];
//     }
//     return null;
// }

// console.log(find([2, 7, 11, 15], 14))

/**
 * 用reduce实现
 * 转化下划线命名到驼峰命名
 * hff_fe_a2 -> hffFeA2
 */

function convert(str) {
    return str.split('').reduce((acc, cur) => {
        return acc.endsWith('_') ? acc.substring(0, acc.length - 1) + cur.toUpperCase() : acc + cur;
    });
}

console.log(convert('hff_fe_a2'));