function func (value) {
    console.log(value); // 需要绑定且防抖
}

function debounce(fun, delay) {
    let timer = null;
    return function() {
        let _that = this;
        let _argu = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fun.apply(_that, _argu);
        }, delay)
    }
}

let debounceFunc = debounce(func, 500);

/*
 * 【防抖】
 *  当频繁地触发绑定事件时，并不会调用函数
 *  只有当用户在指定间隔内没有操作时，才会执行函数。
 *  如果停止输入但是在指定间隔内又输入，会重新触发计时
 */
window.addEventListener('click', () => {
    debounceFunc("debounce");
});
