# 前端知识点 :mortar_board:

* [基础知识](#1) 
    * [计算机网络](#1.1)
      * [URL到页面显示](#1.1.1)
      * [强缓存与协商缓存](#1.1.2)
      * [TCP与UDP](#1.1.3)
    * [HTTP](#1.2)
      * [HTTP基础](#1.2.1)
      * [HTTPS, HTTP/2](#1.2.2)
      * [localStorage & sessionStorage](#1.2.3)
      * [Cookie & Session](#1.2.4)
      * [Token](#1.2.5)
    * [浏览器](#1.3)
      * [渲染](#1.3.1)
      * [重排与重绘](#1.3.2)
      * [前端优化](#1.3.3)
* [CSS相关](#2)
  * [元素定位](#2.1)
    * [基础css定位](#2.1.1)
    * [使元素消失](#2.1.2)
    * [水平居中](#2.1.3)
    * [垂直居中](#2.1.4)
    * [清除浮动](#2.1.5)
    * [flex布局](#2.1.6)
  * [css其他](#2.2)
    * [css引入](#2.2.1)
    * [选择器的优先级](#2.2.2)
    * [盒模型](#2.2.3)
* [JavaScript](#3)
  * [this](#3.1)
  * [数组操作](#3.2)
  * [typeof](#3.3)
  * [instanceof](#3.4)
  * [if条件判断](#3.5)
  * [apply, call 和 bind](#3.6)
  * [js跨域](#3.7)
  * [ECMAScript 6](#3.8)
    * [基本数据类型](#3.8.1)
    * [let和var的区别](#3.8.2)
    * [Promise](#3.8.3)
  * [事件委托](#3.9)
  * [`for in` 和 `for of` 的区别](#3.10)

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

- HTTP是一个无状态的面向连接的协议 :sake:
  - 属于应用层的面向对象协议。明文传输，端口80
  - HTTP协议是无状态的，指的是协议对于事务处理没有记忆能力，服务器不知道客户端是什么状态
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
    - <img src='/assets/5.jpg' width='600px'/>
  - HTTP状态码
    - 1xx：指示信息--表示请求已接收，继续处理
    - 2xx：成功--表示请求已被成功接收、理解、接受
    - 3xx：重定向--要完成请求必须进行更进一步的操作
      - 301 永久重定向
      - 302 临时重定向
      - 304 资源未修改 （缓存是最新的，客户端应访问缓存）
        - <img src='/assets/3.png' width='700px'/>
    - 4xx：客户端错误--请求有语法错误或请求无法实现
      - 401 请求未授权
      - 404 请求资源不存在
    - 5xx：服务器端错误--服务器未能实现合法的请求
      - 500 服务器发生不可预期的错误
      - 503 服务器当前不能处理客户端的请求，一段时间后可能恢复正常
  - HTTP/1.0 & HTTP/1.1
    - 在HTTP/1.0中，默认使用的是`短连接`。也就是说，浏览器和服务器每进行一次HTTP操作，就建立一次连接，但任务结束就中断连接。当浏览器每遇到这样一个Web资源，就会建立一个HTTP会话。
    - HTTP/1.1起，默认在响应头加入`Connection: keep-alive`，用以保持连接特性。

<h4 id='1.2.2'>HTTPS, HTTP/2</h4>

- HTTPS = HTTP + SSL :sake:
  - 加密传输和身份认证的网络协议
  - SSL是在传输层实现的
- HTTP/2
  - 在 TCP 协议中，数据的传输单位是`数据报`。数据分成两大部分。头部(header) 和 实际数据部分(body)。
  - 在 HTTP 2.0 中，它把数据报的两大部分分成了 `header frame` 和 `data frame`
  - `HTTP/2`引入`二进制数据帧`和`流`的概念，其中帧对数据进行顺序标识，如下图所示，这样浏览器收到数据之后，就可以按照序列对数据进行合并，而不会出现合并后数据错乱的情况。同样是因为有了序列，服务器就可以并行的传输数据，这就是流所做的事情。
  - **<img src='/assets/http2.png' width='400px'/>**
  - 在建立连接后，`一次的请求与被响应`，视为`流`
  - `HTTP/2`对同一域名下所有请求都是基于流，也就是说同一域名不管访问多少文件，也只建立**一路连接**.
  - 在`HTTP/1.1`中，一次链接成功后，只要该链接还没断开，那么 `client` 端可以在这么一个链接中**有序**地发起多个请求，并以此获得每个请求对应的响应数据。它的缺点是，一次请求与响应的交互必须要等待前面的请求交互完成，否则后面的只能等待，这个就是**线头阻塞**。而`HTTP/2`中，一次链接成功后，只要链接还没断开，那么 `client` 端就可以在一个链接中**并发**地发起多个请求。

<h4 id='1.2.3'>localStorage & sessionStorage</h4>

| 特性               | Cookie                                                                             | LocalStorage                                                | SessionStorage                                              |
| ------------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| **数据的生命周期** | 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效 | 除非被清除，否则永久保存                                    | 仅在当前会话下有效，关闭页面或浏览器后被清除                |
| **存放数据大小**   | 4k左右                                                                             | 5MB                                                         | 5MB                                                         |
| **与服务器端通信** | 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题                   | 仅在客户端（即浏览器）中保存，不参与和服务器的通信          | 仅在客户端（即浏览器）中保存，不参与和服务器的通信          |
| **易用性**         | 需要程序员自己封装，原生的Cookie接口不友好                                         | 原生接口可以接受，亦可再次封装来对Object和Array有更好的支持 | 原生接口可以接受，亦可再次封装来对Object和Array有更好的支持 |

<h4 id='1.2.4'>Cookie & Session</h4>

> 由于http的无状态性，为了使某个域名下的所有网页能够共享某些数据，session和cookie出现了。

- 客户端访问服务器的流程如下
  - <img src='/assets/6.png' width='400px'/>
- cookie :cookie:只是实现session的其中一种方案。虽然是最常用的，但并不是唯一的方法。禁用cookie后还有其他方法存储，比如放在url中。
- :cookie: + Session
  - 用session只需要在客户端保存一个id，实际上大量数据都是保存在服务端。如果全部用cookie，数据量大的时候客户端是没有那么多空间的。
  - 如果只用cookie不用session，那么账户信息全部保存在客户端，一旦被劫持，全部信息都会泄露。并且客户端数据量变大，网络传输的数据量也会变大。

<h4 id='1.2.5'>Token</h4>

> Token的使用类似于临时的证书签名，适用于REST API。是一种服务端无状态的认证方式，所谓无状态就是服务端并不会保存身份认证相关的数据。

- :closed_lock_with_key:Token的组成
  - **uid** - 用户唯一身份标识
  - **time** - 当前时间戳
  - **sign** - 使用 hash/encrypt 压缩成定长的十六进制字符串，以防止第三方恶意拼接
  - 可选参数 - 将一些常用的固定参数加入到 token 中是为了避免重复查库
- Token在客户端一般存放于localStorage，cookie，或sessionStorage中
- Token的使用流程
  - 用户登录，成功后服务器返回Token给客户端。
  - 客户端收到数据后保存在客户端
  - 客户端再次访问服务器，将token放入headers中
  - 服务器端采用filter过滤器校验。校验成功则返回请求数据，校验失败则返回错误码
- Token可以抵抗CSRF，:cookie:+session不行
  - CSRF 跨站请求伪造
    - 验证码；强制用户必须与应用进行交互，才能完成最终请求。此种方式能很好的遏制 csrf，但是用户体验比较差。
    - Referer check；请求来源限制，此种方法成本最低，但是并不能保证 100% 有效，因为服务器并不是什么时候都能取到 Referer，而且低版本的浏览器存在伪造 Referer 的风险。
    - token；token 验证的 CSRF 防御机制是公认最合适的方案。(具体可以查看本系列前端鉴权中对token有详细描述)若网站同时存在 XSS 漏洞的时候，这个方法也是空谈。
  - XSS 脚本攻击
    - httpOnly: 在 cookie 中设置 HttpOnly 属性后，js脚本将无法读取到 cookie 信息。
    - 输入过滤: 一般是用于对于输入格式的检查，例如：邮箱，电话号码，用户名，密码……等，按照规定的格式输入。不仅仅是前端负责，后端也要做相同的过滤检查。因为攻击者完全可以绕过正常的输入流程，直接利用相关接口向服务器发送设置。
    - 转义 HTML: 如果拼接 HTML 是必要的，就需要对于引号，尖括号，斜杠进行转义,但这还不是很完善.想对 HTML 模板各处插入点进行充分的转义,就需要采用合适的转义库.(可以看下这个库,还是中文的)

<hr>
<h3 id='1.3'>浏览器</h3>

<h4 id='1.3.1'>渲染</h4>

- 浏览器把HTML源代码解析，并且创建一个**DOM树**:evergreen_tree:
  - 每个HTML标签在这个树上都有一个对应的节点，标签中的文本也有一个相应的文本节点。
  - DOM树上的根节点是documentElement
- 浏览器基于样式创建**Render树**:deciduous_tree:，一旦渲染树被创建成功，浏览器就可以在屏幕上绘制渲染树节点。

<h4 id='1.3.2'>重排与重绘</h4>

- 重排
  - 部分/整个渲染树需要重新分析并且节点尺寸需要重新计算。这被称为**重排**。注意至少会有一次重排 - 初始化页面布局。
- 重绘
  - 由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新。这样的更新被称为**重绘**。
- **重排一定导致重绘，重绘不一定导致重排**
- 任何改变用来构建渲染树的信息都会导致一次重排或重绘
  - 添加、删除、更新DOM节点
  - 通过`display: none`隐藏一个DOM节点 - **重排 & 重绘**
  - html5新增 `<div hidden></div>` = `display:none`
  - 通过`visibility: hidden`隐藏一个DOM节点 - **只触发重绘**，因为没有几何变化
  - 通过`ocpacity: 0`隐藏一个DOM - **只触发重绘**
  - 通过 `transform: scale(0);` 也可以
  - 移动或者给页面中的DOM节点添加动画
  - 添加一个样式表，调整样式属性
  - 用户行为，例如调整窗口大小，改变字号，或者滚动
- 减少重绘重排的方法有
  - 不在布局信息改变时做DOM查询，
  - 使用className一次性改变属性
  - 对于多次重排的元素，比如说动画。使用绝对定位**脱离文档流**，使其不影响其他元素

<h4 id='1.3.3'>前端优化</h4>

- 降低请求量 
  - 合并资源
  - 降低Http请求数
  - minify / gzip 压缩
  - lazyLoad
- 加快请求速度
  - 预解析DNS
  - 并行加载
  - 减少域名数
  - CDN（内容分发网络 - 分布式）
- 渲染
  - JS/CSS优化
  - 加载顺序
  - 服务端渲染

---
<h2 id='2'>CSS相关</h2>
<h3 id='2.1'>元素定位</h3>
<h4 id='2.1.1'>基础css定位</h4>

- **static**
  - 默认值，位置设置为 static 的元素，它始终会处于文档流给予的位置
- **inherit**
  - 规定应该从父元素继承 position 属性的值
- **relative**
  - 生成相对定位的元素
  - 相对于**该元素在文档中的初始位置**进行定位
  - 不管是否移动，元素依然占据原来的位置。因此，移动元素会导致它覆盖其它框
  - 通过 “left”、”top”、”right” 以及 “bottom” 属性来设置此元素**相对于自身位置**的偏移
- **absolute**
  - 生成绝对定位的元素
  - 相对于距该元素**最近的**定位**不是static**的**祖先元素**进行定位。
  - 如果没有一个祖先元素设置定位，那么参照物是**body**。
  - 此元素的位置可通过 “left”、”top”、”right” 以及 “bottom” 属性来规定。
  - **脱离文档流**
- **fixed**
  - 生成绝对定位的元素
  - 默认情况下，可定位于相对于浏览器窗口的指定坐标。不论窗口滚动与否，元素都会留在那个位置。
  - 但当祖先元素具有 ```transform``` 属性且不为 ```none``` 时，就会相对于祖先元素指定坐标，而不是浏览器窗口。
  - 元素的位置通过 “left”, “top”, “right” 以及 “bottom” 属性进行规定。
  - **脱离文档流**
- **transform**
  - transform后可加
    - ```translate(tx, ty)``` 
      - 正数：向右向下
      - 负数：向左向上
      - 可百分比（相对自身）
    - ```scale(tx, ty)```
    - ```rotate(30deg)```

<h4 id='2.1.2'>使元素消失</h4>

- ```opacity: 0``` 不会改变页面布局，并且，如果该元素已经绑定一些事件，如click事件，那么点击该区域，也能触发点击事件的
- ```visibility: hidden``` 不会改变页面布局，但是不会触发该元素已经绑定的事件
- ```display: none``` 改变页面布局，可以理解成在页面中把该元素删除掉。

<h4 id='2.1.3'>水平居中</h4>

- 规定元素的宽度
```css
.inner {
  position: absolute; /*或relative*/

  width: 30px; /*规定元素宽度*/
  height: 80px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /*相对自身偏移量*/
}
```

- 只使用margin 
```css
.inner {
  position: relative;
  margin: 0 auto; /*左右auto*/
  width: 30px;
  height: 80px;
}
```

<h4 id='2.1.4'>垂直居中</h4>

- 利用absolute 脱离文档流居中

```css
.inner {
  display: absolute;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  margin: -50px 0 0 0;  /*需要知道高度*/
}

.inner {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto; /*利用margin，且top和bottom值必须相等*/
}
```

- 使用flex布局
```css
.outer {
  display: flex;
  align-items: center;
}
```

- 父元素使用table-cell
```css
.outer {
  display: table-cell;
  vertical-align: middle;
}
```

- css3属性transform
```css
.inner {
  position: relative;
  margin-top: 50%;
  transform: translateY(-50%);
}
```

<h4 id='2.1.5'>清除浮动</h4>

- 利用clear属性，清除浮动

```css
/* 
 * 在子元素后添加新的div.clear 
 *  <div class="box">
 *    <div class="div1">1</div>
 *    <div class="div2">2</div>
 *    <div class="div3">3</div>
 *    <div class="clear"></div>
 *  </div>
**/
.clear {
  clear: both; /*规定元素的两侧不允许其之前浮动元素*/
  height: 0;
}

/* 或在父级样式添加伪元素:after或者:before */
.box::after{
  content: '';
  display: block;
  clear: both;
}
```

- 使父容器形成**BFC**（Block Format Context）
  - ```float``` 不为 none
  - ```overflow```: 不为 visible
  - ```display```: inline-block 或 table-cell 或 table-caption
  - ```position```: absolute 或 fixed
  - 根元素

比如
```css
.box {
  overflow: auto;
}
```

- BFC的原理及应用
  - **阻止`margin`重叠**
    - 根据BFC的规则: Box垂直方向的距离由`margin`决定。属于同一个BFC的两个相邻Box的`margin`会发生重叠
    - 在其中一个div外面包裹一层，并且设置一个BFC。他们之前都是同一根元素下面，现在让其中一个div脱离出来
  - **清除内部浮动**
    - 根据BFC的规则: 计算BFC的高度时，浮动元素也参与计算
    - 解决办法将parent设置`overflow:hidden`,产生一个BFC，既可以让浮动元素参与高度计算
  - **自适应两栏布局**
    - 根据BFC的规则: 每个元素的margin box的左边， 与包含块border box的左边相接触，即使存在浮动也是如此
    - 解决办法就是将右边的部分重新设置一个BFC

<h4 id='2.1.6'>flex布局</h4>

- 以下6个属性设置在容器上
  - `flex-direction`
    - 决定主轴的方向（即项目的排列方向）
      ```js
      .box {
        flex-direction: row | row-reverse | column | column-reverse;
      }
      ```
    - <img src="./assets/flex-direction.png" width="400px">
    - `flex-direction`可能有四个值
      - `row`（默认值）：主轴为水平方向，起点在左端。
      - `row-reverse`：主轴为水平方向，起点在右端。
      - `column`：主轴为垂直方向，起点在上沿。
      - `column-reverse`：主轴为垂直方向，起点在下沿。
    
  - `flex-wrap`
    - `flex-wrap`属性定义，如果一条轴线排不下，如何换行。
      ```js
      .box{
        flex-wrap: nowrap | wrap | wrap-reverse;
      }
      ```
    - `flex-wrap`可能取三个值
      - `nowrap` 不换行
      - `wrap` 换行，第一行在上方
      - `wrap-reverse` 换行，第一行在下方

  - `flex-flow`
    - `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。
      ```js
      .box{
        flex-flow: <flex-direction> || <flex-wrap>;
      }
      ```

  - `justify-content`
    - `justify-content`属性定义了项目在主轴上的对齐方式。
      ```js
      .box {
        justify-content: flex-start | flex-end | center | space-between | space-around;
      }
      ```
    - `justify-content`可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。
      - `flex-start`（默认值）：左对齐  
      - `flex-end`：右对齐
      - `center`： 居中
      - `space-between`：两端对齐，项目之间的间隔都相等。
      - `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍 

  - `align-items`
    - `align-items`属性定义项目在交叉轴上如何对齐。
      ```js
      .box {
        align-items: flex-start | flex-end | center | baseline | stretch;
      }
      ```
      <img src="./assets/align-items.png" width="400px">
    - `flex-start`：交叉轴的起点对齐。
    - `flex-end`：交叉轴的终点对齐。
    - `center`：交叉轴的中点对齐。
    - `baseline`: 项目的第一行文字的基线对齐。
    - `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
     
  - `align-content`
    - `align-content` 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
      ```js
      .box {
        align-content: flex-start | flex-end | center | space-between | space-around | stretch;
      }
      ```
      <img src="./assets/align-content.png" width="400px">
    - `flex-start`：与交叉轴的起点对齐。
    - `flex-end`：与交叉轴的终点对齐。
    - `center`：与交叉轴的中点对齐。
    - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
    - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    - `stretch`（默认值）：轴线占满整个交叉轴。
  
- 以下6个属性设置在项目上
  - `order`
    - 定义项目的排列顺序。数值越小，排列越靠前，默认为0。
      ```js
      .item {
          order: <integer>;
        }
      ```
      <img src="./assets/order.png" width="400px">
    
  - `flex-grow`
    - 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    - 如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
   
  - `flex-shrink`
    - 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
    - 如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。
    - 负值对该属性**无效**。
   
  - `flex-basis`
    - 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。
    - 它可以设为跟 `width` 或 `height` 属性一样的值（比如`350px`），则项目将占据固定空间。
  
  - `flex`
    - `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis` 的简写，默认值为`0 1 auto`。后两个属性可选。
    - 该属性有两个快捷值：`auto` (1 1 auto) 和 `none` (0 0 auto)
    - 建议**优先使用这个属性**，而不是单独写三个分离的属性，因为浏览器会推算相关值。
   
  - `align-self`
    - 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。




<h3 id='2.2'>css其他</h3>

<h4 id='2.2.1'>css引入</h4>

> link 和 @import 都是引入外部 CSS 的方式
- @import 由 CSS 提供，只能导入样式
- link 是 XHTML 标签，不仅可以链接外部样式文件，还可以定义RSS，rel连接属性等。

<h4 id='2.2.2'>选择器的优先级</h4>

- id选择器 > class选择器 = 伪类 > 标签名称选择器
- 带有!important 标记的样式属性的优先级最高

<h4 id='2.2.2'>盒模型</h4>

- 标准盒模型：一个块的总宽度 = width + margin(左右) + border(左右) + padding(左右) 
- IE盒模型：一个块的总宽度 = width + margin（左右）（既width已经包含了padding和border值）
- box-sizing
  - box-sizing:content-box 表示标准的盒子模型
  - box-sizing:border-box 表示的是IE盒子模型

---
<h2 id='3'>JavaScript</h2>

<h3 id='3.1'>this</h3>

- 在使用```new```实例化对象时，```this```指向这个实例对象
- 当对象调用方法时，```this```指向这个对象。
- ```this```只有函数执行的时候才能确定```this```到底指向谁，实际上```this```的最终指向的是那个调用它的对象

<h3 id='3.2'>数组操作</h3>

- ```length = arr.push(e1, e2...)``` 向数组的末尾添加一个或多个元素，并返回新的长度
- ```item = arr.shift()``` 删除并返回第一个元素
- ```length = arr.unshift(e1, e2...)``` 将接受的元素放入数组头部，并返回新的长度
- ```arr = arr1.concat(arr2, arr3...)``` 用于连接两个或多个数组,**原始的数组不会发生变化**
- ```cutArr = arr.slice(start，end)```
  - 从start开始截取到end,**但是不包括end**
  - 返回值为截取出来的元素的集合
  - **原始的数组不会发生变化**
- ```cutArr = splice(start, deleteCount, item1, item2...)```
  - 返回值为由被删除的元素(删除了```deleteCount```个)组成的一个数组
  - start = -1，表示从最后一个开始， -2就是倒数第二个.etc
  - 这个方法会**改变**原始数组，数组的长度会发生变化
- ```arr.reduce(callback, initialValue)```
  - callback （执行数组中每个值的函数，包含四个参数）
    - accumulateValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    - currentValue （数组中当前被处理的元素）
    - index （当前元素在数组中的索引）
    - array （调用 reduce 的数组）
  - initialValue （作为第一次调用 callback 的第一个参数。）
  ```js
  let max = a.reduce((acc,cur,inde,arr) => {
    return acc > cur? acc : cur;
  });
  ```
- ```arr.sort()```
  - 没传比较函数的话，默认按字母升序，如果不是元素不是字符串的话，会调用toString()方法将元素转化为字符串的Unicode点，然后再比较字符。
  - 升序 
    ```js
    sort.sort(function(a,b){
      return a - b;
    });
    ```
  - 降序 
    ```js
    sort.sort(function(a,b){
      return b - a;
    });
    ```
  - 可自定义比较函数 🌰
    ```js
    arr.sort(function(a, b) => {
      if (a.name === 'Heroku') { // -1, a排在b前面
        return -1;
      } else {
        return 1; //a排在b后面
      }
    })
    ```
-  ```array.forEach(function(currentValue, index, arr), thisValue)```
   -  currentValue(必须),数组当前元素的值
   - index(可选), 当前元素的索引值
   - arr(可选), 数组对象本身
   - thisValue(可选): 当执行回调函数时this绑定对象的值，默认值为undefined
    ```js
    let arr = [1, 2, ,3]; // 倒数第二个元素为空，不会被遍历， 但 undefined, null 会被遍历
    let obj = { name: 'Heroku' };
    arr.forEach((item, idx, arr) => {
      arr[3] = 'alter'; //遍历到 idx=3 时会使用新值 alter
      arr.push(4); //不会被遍历
      console.log(this.name); //三次'Heroku'，因为this被绑定到obj上
      break; //报错
      return item; //进行下一次回调

    }, obj);
    ```
- ```let new_array = arr.map(function(currentValue, index, arr), thisArg)```
  - currentValue(必须), 数组当前元素的值
  - index(可选), 当前元素的索引值
  - arr(可选), 数组对象本身
  -  和 `forEach` 的区别是，不会改变原数组，`map` 返回值为map后的新数组
- `let new_array = arr.filter(function(currentValue, index, arr), thisArg)`
  - 返回值是符合filter条件的所有元素组成的新数组
  ```js
  let arr = [23, 24, 10, 99];
  let res = arr.filter(val => {
    return val > 20;
  });
  //res = [23, 24, 99]
  ```

<h3 id='3.3'>typeof</h3>

> 所有的基本类型 number, boolean, string, symbol, undefined 都可以被判断
- `typeof true` boolean
- `typeof 2` number
- `typeof NaN` number
- `typeof '22'` string
---
> 所有的对象都会被判断为 object, 使用 new 关键字的时候，除了 new Function 其他都会被判断为 object
- `typeof {}` object
- `typeof new Array` object
- `typeof null` object :trollface:
- `typeof /regex/` object
---
- `typeof NULL` undefined :trollface:
- `typeof undefined` undefined
--- 
> 函数，构造函数都是 function，且能用 new xxx() 构造出一个对象的, typeof xxx 就是 function
- `typeof Function` function
- `typeof class C {}`  function;
- `typeof Object` function :trollface:
- `typeof Math.sin`  function;

<h3 id='3.4'>instanceof</h3>

> instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置 

- 所有对象和函数 instanceof Object  //true （因为JS万物皆对象，函数也是对象）
- 所有函数 instanceof Function  //true（这个很好理解，包括普通函数和构造函数）
- 除Object和Function之外的构造函数 instanceof 自身  //false （因为构造函数的原型链上只有Function.prototype和Object.prototype而没有它们自身的prototype）
```js
null instanceof Object // false
null typeof Object // true
undefined == null // true
undefined == NULL // false
typeof undefined == typeof NULL // true
undefined !== nulll // true
```

<h3 id='3.5'>if条件判断</h3>

- if(x) 这里期望 x 是一个布尔类型的原始值
- 在 JS 中，只有 0，-0，NaN，""，null，undefined 这六个值转布尔值时，结果为 false

<h3 id='3.6'>apply, call 和 bind</h3>

- **apply**
  - apply 方法传入两个参数：一个是作为函数上下文的对象，另外一个是作为函数参数所组成的数组。
    ```js
    var obj = {
      name : 'zoey'
    }
    function func(firstName, lastName){
        console.log(firstName + ' ' + this.name + ' ' + lastName);
    }
    func.apply(obj, ['A', 'B']); // A zoey B
    ```
  - 举例，直接应用min找出最小元素：`let minElement = Math.min.apply(null, arr);`
- **call**
  - call 同样可以实现和上述一样的效果，但第二个传参是一个参数列表，而不是单个数组
  - `func.call(obj, 'A', 'B')`
  - apply、call 方法都会使函数**立即执行**，因此它们也可以用来调用函数 - `func.call()`
- **bind**
  - bind 和 call 很相似，接受的参数有两部分，第一个参数是是作为函数上下文的对象，第二部分参数是个列表，可以接受多个参数。
  - bind 返回值是一个新函数
    ```js
    let func1 = func.bind(obj);
    func1(); // zoey
    ```
  - bind 方法**不会立即执行**，而是返回一个改变了上下文 this 后的新函数。而原函数 func 中的 this 并没有被改变，依旧指向全局对象 window。

<h3 id='3.7'>js跨域</h3>

- **jsonp**: jsonp的原理是利用`<script>`标签的跨域特性，可以不受限制地从其他域中加载资源，类似的标签还有`<img>`. jsonp只能发送get请求。
  ```js
  script = document.createElement('script');
  script.type = 'text/javascript';

  // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
  script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
  document.body.appendChild(script);

  // 回调执行函数
  function handleCallback(res) {
      log(JSON.stringify(res));
  }

  //服务器返回如下
  handleCallback({"status": true, "user": "admin"})
  ```
- **document.domain**:
  - 这种方式用在主域名相同子域名不同的跨域访问中,所用的协议，端口都要一致. `a.jd.com & b.jd.com`
  ```js
  document.domain = 'baidu.com';

  let ifr = document.createElement('iframe');
  ifr.src = 'map.baidu.com/map.html';
  ifr.style.display = 'none';
  document.body.appendChild(ifr);

  ifr.onload = function(){
    let doc = ifr.contentDocument || ifr.contentWindow.document;
    // 这里可以操作map.baidu.com下的map.html页面
    let oUl = doc.getElementById('ul1');
    alert(oUl.innerHTML);
    ifr.onload = null;
  }
  ```
- **window.name**: window的name属性有个特征：在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。
- **window.postMessage**: window.postMessages是html5中实现跨域访问的一种新方式，可以使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源。
- **CORS**: CORS背后的基本思想，就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是应该失败。浏览器判断请求头的 `Origin` 与响应头的 `Access-Control-Allow-Origin` 匹配成功。
  ```js
  let xhr = new XMLHttpRequest(); 
  // 前端设置是否带cookie
  xhr.withCredentials = true;

  xhr.open('post', 'http://www.domain.com:8080/login', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('data);

  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          alert(xhr.responseText);
      }
  };
  ```
- **Web Sockets**: 在JS创建了web socket之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web sockt协议。

---
<h3 id='3.8'>ECMAScript 6</h3>

<h4 id='3.8.1'>基本数据类型</h4>

- Number、String、Null、Undefined、Symbol（新增）、Boolean
- 只有一种复杂数据类型 Object
- 基本数据类型将值存储在栈里；而复杂数据类型将引用放在栈里，值存储在堆里
- 在拷贝过程中，基本数据类型直接进行值的拷贝，而复杂数据类型会拷贝引用，任何值改变的操作都会影响原始数据（这就是为什么要用深拷贝）

<h4 id='3.8.2'>let和var的区别</h4>

- **let 不存在变量提升**
  ```js
  console.log(foo); // 输出undefined
  var foo = 2;

  console.log(bar); // 报错ReferenceError
  let bar = 2;
  ```
- **let 仅在代码块内生效**
  ```js
  {
    let a = 10;
    var b = 1;
  }

  a // ReferenceError: a is not defined.
  b // 1
  ```
- **let 和 const 存在暂时性死区**
  - 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
  ```js
  var tmp = 123;

  if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
  }
  ```
- **let 依照块级作用域**
  - ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。第一种场景，内层变量可能会覆盖外层变量。第二种场景，用来计数的循环变量泄露为全局变量。
  - let 实际上为 JavaScript 新增了块级作用域。

<h4 id='3.8.3'>Promise</h4>

- **对象的状态不受外界影响**
  - Promise对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。
- **一旦状态改变，就不会再变**
  - Promise对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
- **任何时候都可以得到这个结果**
  - 如果改变已经发生了，再对Promise对象添加回调函数，也会立即得到这个结果。
- **举个例子**🌰
  ```js
    const getJSON = function(url) { // promise实现ajax异步加载
		const promise = new Promise(function(resolve, reject){
			const handler = function() {
			if (this.readyState !== 4) {
				return;
			}
			if (this.status === 200) {
				resolve(this.response);
			} else {
				reject(new Error(this.statusText));
			}
			};
			const client = new XMLHttpRequest();
			client.open("GET", url);
			client.onreadystatechange = handler;
			client.responseType = "json";
			client.setRequestHeader("Accept", "application/json");
			client.send();

		});

		return promise;
	};

	getJSON("/posts.json").then(function(json) {
		console.log('Contents: ' + json);
		}, function(error) {
		console.error('出错了', error);
	});
  ```


<h3 id='3.9'>事件委托</h3>

> 事件委托又称事件代理，是指利用事件冒泡，只制定一个事件处理程序，就可以管理某一类型的全部事件。

- 适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress
- 不适合：
  - focus，blur（没有冒泡属性）
  - mouseover和mouseout虽然也有事件冒泡，但是处理它们的时候需要特别的注意，因为需要经常计算它们的位置，处理起来不太容易。
```js
target.addEventListener(type, listener [,{capture: Boolean, bubbling: Boolean, once: Boolean}]);
```
- **capture**
  - true: 捕获阶段触发
  - false：目标或冒泡阶段触发
- **once** 表示listener在添加之后最多只调用一次
- **passive** 表示listener永远不会调用preventDefault() 

举个🌰
```js
window.onload = function(){
  var oBtn = document.getElementById("btn");
  var oUl = document.getElementById("ul1");
  var aLi = oUl.getElementsByTagName('li');
  var num = 4;
  
  //事件委托，添加的子元素也有事件
  oUl.onmouseover = function(ev){
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      if(target.nodeName.toLowerCase() == 'li'){ // nodeName会返回大写
        target.style.background = "red";
      }
  };

  oUl.onmouseout = function(ev){
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      if(target.nodeName.toLowerCase() == 'li'){
        target.style.background = "#fff";
      }
  };
  
  //添加新节点
  oBtn.onclick = function(){
      num++;
      var oLi = document.createElement('li');
      oLi.innerHTML = 111*num;
      oUl.appendChild(oLi);
  };
}
```

<h3 id='3.10'>for in 和 for of 的区别</h3>

> 简略不看型：遍历数组用`for of`，遍历对象用`for in`. 使用`for in`会遍历数组所有的可枚举属性，包括原型。

- for in
  - for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。
  - 如果不想遍历原型方法和属性的话，可以在循环内部判断一下,`hasOwnPropery`方法可以判断某属性是否是该对象的实例属性
  ```js
    for (var key in myObject) {
  　  if（myObject.hasOwnProperty(key)){
  　　  console.log(key);
  　  }
    }
  ```
- for of
  - `for..of`适用遍历数/数组对象/字符串/map/set等拥有**迭代器**对象的集合
  - 与`forEach()`不同的是，它可以正确响应`break`、`continue`和`return`语句

