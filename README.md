# 前端知识点 :mortar_board:

* [基础知识](#1) 
    * [计算机网络](#1.1)
      * [URL到页面显示](#1.1.1)
      * [强缓存与协商缓存](#1.1.2)
      * [TCP与UDP](#1.1.3)
    * [HTTP](#1.2)
      * [HTTP基础](#1.2.1)
      * [HTTPS](#1.2.2)
      * [localStorage & sessionStorage](#1.2.3)
      * [Cookie & Session](#1.2.4)
      * [Token](#1.2.5)
* [CSS相关](#2)
* [JavaScript](#3)

<h2 id='1'>基础知识</h2>
<h3 id='1.1'>计算机网络</h3>
<img src='/assets/1.png' width='400px'/>

<h4 id='1.1.1'>从输入URL到页面显示的过程</h4>

- DNS解析
  - DNS处于应用层，为HTTP,SMTP,FTP应用层协议等，提供将主机名解析为ip地址的服务
- TCP连接
- 发送HTTP请求
- 服务器处理并返回HTTP报文
- 浏览器解析渲染页面
- 连接结束

<h4 id='1.1.2'>强缓存与协商缓存</h4>

- :hocho:强缓存
  - 浏览器直接从本地缓存中获取数据，不与服务器进行交互
- :hocho:协商缓存
  - 浏览器发送请求到服务器，服务器判断是否可使用本地缓存
  - <img src='/assets/2.png' width='600px'/>
  
<h4 id='1.1.3'>TCP与UDP</h4>

- TCP 对应的协议有
  - FTP：定义了文件传输协议，使用21端口。
  - Telnet：一种用于远程登陆的端口，使用23端口，用户可以以自己的身份远程连接到计算机上，可提供基于DOS模式下的通信服务。
  - SMTP：邮件传送协议，用于发送邮件。服务器开放的是25号端口。
  - POP3：它是和SMTP对应，POP3用于接收邮件。POP3协议所用的是110端口。
  - HTTP：是从Web服务器传输超文本到本地浏览器的传送协议。
- UDP 对应的协议有
  - DNS：用于域名解析服务，将域名地址转换为IP地址。DNS用的是53号端口。
  - SNMP：简单网络管理协议，使用161号端口，是用来管理网络设备的。由于网络设备很多，无连接的服务就体现出其优势。
  - TFTP(Trival File Transfer Protocal)，简单文件传输协议，该协议在熟知端口69上使用UDP服务。

<hr>
<h3 id='1.2'>HTTP</h3>

<h4 id='1.2.1'>HTTP基础</h4>

- 无状态连接 :sake:
  - 属于应用层的面向对象协议。明文传输，端口80
  - 客户端发送一个HTTP请求到服务器的请求消息
    - 请求行
    - 请求头部 （http的header分隔符 \r\n）
    - 空行 （**必须**）
    - 请求数据
    - <img src='/assets/4.png' width='400px'/>
  - 服务器响应消息
    - 状态行
    - 消息报头
    - 空行（**必须**）
    - 响应正文
    - <img src='/assets/5.jpg' width='400px'/>
  - HTTP状态码
    - 1xx：指示信息--表示请求已接收，继续处理
    - 2xx：成功--表示请求已被成功接收、理解、接受
    - 3xx：重定向--要完成请求必须进行更进一步的操作
      - 301 永久重定向
      - 302 临时重定向
      - 304 资源未修改 （缓存是最新的，客户端应访问缓存）
        - <img src='/assets/3.png' width='600px'/>
    - 4xx：客户端错误--请求有语法错误或请求无法实现
      - 401 请求未授权
      - 404 请求资源不存在
    - 5xx：服务器端错误--服务器未能实现合法的请求
      - 500 服务器发生不可预期的错误
      - 503 服务器当前不能处理客户端的请求，一段时间后可能恢复正常

<h4 id='1.2.2'>HTTPS</h4>

- HTTPS = HTTP + SSL :sake:
  - 加密传输和身份认证的网络协议
  - SSL是在传输层实现的

<h4 id='1.2.3'>localStorage & sessionStorage</h4>

特性 | Cookie | LocalStorage | SessionStorage | 
-----|------|------|------|
**数据的生命周期**|一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效|除非被清除，否则永久保存|仅在当前会话下有效，关闭页面或浏览器后被清除|
**存放数据大小** | 4k左右  |5MB |5MB |
**与服务器端通信** | 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 | 仅在客户端（即浏览器）中保存，不参与和服务器的通信 | 仅在客户端（即浏览器）中保存，不参与和服务器的通信|
**易用性**| 需要程序员自己封装，原生的Cookie接口不友好  | 原生接口可以接受，亦可再次封装来对Object和Array有更好的支持 | 原生接口可以接受，亦可再次封装来对Object和Array有更好的支持|

<h4 id='1.2.4'>Cookie & Session</h4>

> 由于http的无状态性，为了使某个域名下的所有网页能够共享某些数据，session和cookie出现了。

- 客户端访问服务器的流程如下
  - <img src='/assets/6.png' width='400px'/>
- cookie :cookie:只是实现session的其中一种方案。虽然是最常用的，但并不是唯一的方法。禁用cookie后还有其他方法存储，比如放在url中。
- :cookie: + Session
  - 用session只需要在客户端保存一个id，实际上大量数据都是保存在服务端。如果全部用:cookie:，数据量大的时候客户端是没有那么多空间的。
  - 如果只用:cookie:不用session，那么账户信息全部保存在客户端，一旦被劫持，全部信息都会泄露。并且客户端数据量变大，网络传输的数据量也会变大。

<h4 id='1.2.5'>Token</h4>

> Token的使用类似于临时的证书签名，适用于REST API。是一种服务端无状态的认证方式，所谓无状态就是服务端并不会保存身份认证相关的数据。

- :closed_lock_with_key:Token的组成
  - uid - 用户唯一身份标识
  - time - 当前时间戳
  - sign - 使用 hash/encrypt 压缩成定长的十六进制字符串，以防止第三方恶意拼接
  - 可选参数 - 将一些常用的固定参数加入到 token 中是为了避免重复查库
- :closed_lock_with_key:Token在客户端一般存放于localStorage，cookie，或sessionStorage中
- :closed_lock_with_key:Token的使用流程
  - 用户登录，成功后服务器返回Token给客户端。
  - 客户端收到数据后保存在客户端
  - 客户端再次访问服务器，将token放入headers中
  - 服务器端采用filter过滤器校验。校验成功则返回请求数据，校验失败则返回错误码
- :closed_lock_with_key:Token可以抵抗CSRF，:cookie:+session不行



<h2 id='2'>CSS相关</h2>

<h2 id='3'>JavaScript</h2>