/**
 * 利用 <script> 标签没有跨域限制的漏洞
 * <script> 标签指向一个需要访问的地址并提供一个回调函数来接收数据
 * 只能用于 get 请求
*/

let script = document.createElement('script');
script.type = 'text/javascript';

// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
document.head.appendChild(script);

// 回调执行函数
function handleCallback(res) {
    log(JSON.stringify(res));
}

//服务器返回如下
handleCallback({"status": true, "user": "admin"})

