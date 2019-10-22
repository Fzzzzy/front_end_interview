//==================================== 浅拷贝 ======================================

/*
* 第一层是深拷贝
* 第二层及以后是浅拷贝
* Object.assign({}, obj);
*/

let a = {
    value: 1,
    identity: {
        name: 'uni',
        age: 18
    }
};

let b = Object.assign({}, a);

b.value = 2; // a.value不会被影响
b.identity.name = null; // a.identity.name被改为null
console.log(a.value, a.identity.name); // 1 null


/*
* 和 Object.assign 类似的浅拷贝方法还有 for in 和 拓展运算符... 等
*/

for (let key in a) {
    b[key] = a[key];
}

b = {...a};


//==================================== 深拷贝 ======================================

/* 最简单的方法 
* 会忽视 undefined, symbol, function, object间互相引用的情况
*/

let deepCopy_1 = obj => {
    return JSON.parse(JSON.stringify(obj));
}

/*
* 递归实现深拷贝
*/

let deepCopy = obj => {

    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== 'object') return obj;
    
    let newObj = Array.isArray(obj)? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key]);
        }
    }

    return newObj;
}
