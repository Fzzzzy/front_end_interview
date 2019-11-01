//求数组交集

let a1 = [1, 3, 6, 4, 4];
let a2 = [6, 0, 2, 1, 4];
let a3 = [9, 1, 4];

function findJoin(...rest) {
    if (rest.length === 0) return [];

    return Array.from(rest.reduce((result, arr) => {
        return new Set(result.filter(item => arr.includes(item)))
    }))
}

console.log(findJoin(a1, a2));

/** 
 * 实现 a == 1 && a == 2 && a == 3
 * 重写隐式转换调用的 toString 或 valueOf 
 * Symbol.toPrimitive 的优先级最高
*/ 

let a = {
    i: 1,
    toString() {
        return a.i++;
    },
    valueOf() {
        return a.i++;
    },
    [Symbol.toPrimitive]() {
        return a.i++;
    }
};

//同理使用generator
let a = {
    gn: (function* () {
        yield 1;
        yield 2;
        yield 3;
    })(),
    valueOf() {
        return a.gn.next().value;
    }
}

console.log(a == 1 && a == 2 && a == 3);