function func (value) {
    console.log(`${value[1]}, ${value[2]}`); // 需要绑定且防抖
}

function debounce(func, delay) {
    let timer = null;
    return function(...rest) {
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.call(context, rest);
        }, delay);
    }
}

let debounceFunc = debounce(func, 500);

/*
 * 【防抖】
 *  当频繁地触发绑定事件时，并不会调用函数
 *  只有当用户在指定间隔内没有操作时，才会执行函数。
 *  如果停止输入但是在指定间隔内又输入，会重新触发计时
 *  举例应用场景：输入框的实时查询
 *  可以接受多个参数
 */
window.addEventListener('click', () => {
    debounceFunc("debounce", 'hi', 'zoey');
});