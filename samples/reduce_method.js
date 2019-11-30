//====================== reduce转化下划线命名到驼峰命名 =======================
let arr = Array.from("hff_fe_22");

let newStr = arr.reduce((acc, cur) => {
    let i = acc.indexOf('_');
    if (i > -1) {
        acc = acc.substring(0, i);
        acc += cur.toUpperCase();
    } else {
        acc += cur;
    }
    return acc;
});
console.log(newStr);
