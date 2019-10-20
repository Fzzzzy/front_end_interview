/*
 * 节流：
 * 鼠标不断点击触发，mousedown(单位时间内只触发一次)
 * 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
 *
*/


function func(values) {
    console.log(values[1]); // 需要绑定且节流
}

function throttle(func, delay) {
    let context = this;
    let [timer, past] = [null, null];
    return function (...rest) {
        let now = +new Date();
        if (past && now - past > delay) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.call(context, rest);
                past = now;
            }, delay);
        }
        past = now;
    }
}


let throttleFunc = throttle(func, 1000);

window.addEventListener('keyup', () => {
    throttleFunc("throttle", 'key down');
})