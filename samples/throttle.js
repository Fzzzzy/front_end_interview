/*
 * 节流：
 * 鼠标不断点击触发，mousedown(单位时间内只触发一次)
 * 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
 *
*/


function func (val) {
    console.log(val); // 需要绑定且节流
}

function throttle(fun, delay) {
    let last, timer = null;
    return function(arg) {
        let _that = this;
        let now = +new Date();
        if (last && now < last + delay) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fun.call(_that, arg);
            }, delay);
        } else {
            last = now;
            fun.call(_that, arg);
        }
    }
}

let throttleFunc = throttle(func, 1000);

window.addEventListener('keyup', () => {
    throttleFunc("throttle");
})