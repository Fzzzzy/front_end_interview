# 前端知识点

* [基础知识](#1)
    * [计算机网络](#1.1)
      * [URL到页面显示](#1.1.1)
      * [强缓存与协商缓存](#1.1.2)
* [CSS相关](#2)
* [JavaScript](#3)

<h2 id='1'>基础知识</h2>
<h4 id='1.1'>计算机网络</h4>
<img src='/assets/1.png' width='400px'/>

<h5 id='1.1.1'>从输入URL到页面显示的过程</h5>
- DNS解析
  - DNS处于应用层，为HTTP,SMTP,FTP应用层协议等，提供将主机名解析为ip地址的服务
- TCP连接
- 发送HTTP请求
- 服务器处理并返回HTTP报文
- 浏览器解析渲染页面
- 连接结束

<h5 id='1.1.2'>强缓存与协商缓存</h5>
- 强缓存
  - 浏览器直接从本地缓存中获取数据，不与服务器进行交互
- 协商缓存
  - 浏览器发送请求到服务器，服务器判断是否可使用本地缓存
  - <img src='/assets/2.png' width='600px'/>




<h2 id='2'>CSS相关</h2>

<h2 id='3'>JavaScript</h2>