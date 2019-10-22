// 数组去重

let removeDulp = arr => {
    return arr.reduce((acc, cur) => {

        return acc.concat(acc.includes(cur)? [] : cur);
        
        //或使用拓展运算符
        return acc.includes(cur)? acc : [...acc, cur];

    }, [])
}

console.log(removeDulp([1,23,23,4,1]));
