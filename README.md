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
* [数据结构](#4)

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

<h4 id='1.2.2'>HTTPS</h4>

- HTTPS = HTTP + SSL :sake:
  - 加密传输和身份认证的网络协议
  - SSL是在传输层实现的

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
  - 通过```display: none```隐藏一个DOM节点 - **重排 & 重绘**
  - 通过```visibility: hidden```隐藏一个DOM节点 - **只触发重绘**，因为没有几何变化
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

- 使父容器形成**BFC**（Block Format Content）
  - ```float``` 不为 none
  - ```overflow```: hidden 或 auto 或 scroll
  - ```display```: inline-block 或 table-cell 或 table-caption
  - ```position```: absolute 或 fixed

比如
```css
.box {
  overflow: auto;
}
```

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
    return pre > cur? pre : cur;
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
  let res = arr.fileter(val => {
    return val > 20;
  });
  //res = [23, 24, 99]
  ```

<h3 id='3.3'>typeof</h3>
 
- `typeof true` boolean
- `typeof 2` number
- `typeof NaN` number
- `typeof '22'` string
---
- `typeof {}` object
- `typeof Array` object
- `typeof null` object :trollface:
- `typeof /regex/` object
---
- `typeof NULL` undefined :trollface:
- `typeof undefined` undefined
--- 
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
      test : 'zoey'
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
  - bind 返回值是函数
    ```js
    let func1 = func.bind(obj);
    func1(); // zoey
    ```
  - bind 方法**不会立即执行**，而是返回一个改变了上下文 this 后的函数。而原函数 func 中的 this 并没有被改变，依旧指向全局对象 window。


 


<h2 id='4'>数据结构</h2>

