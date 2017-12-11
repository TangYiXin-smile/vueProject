# vueProject
a comprehensive project base on  vue

###评论组件
涉及到跨域请求
-cors跨域简单请求
    +一般的get请求、提交数据编码方式为application/json或application/form-data的post请求
    *当编码方式为application/json时post提交的数据格式为```key1=val1&key2=val2```
-cors跨域非简单请求
    +当post请求的数据编码方式为application/x-www-form-urlencoded时，为非简单的cors请求，此时发送请求的时候浏览器会先发预检请求为options方式，

####当post请求的数据为application/json格式时数据格式为
####四种常见的post提交数据的方式
http协议规定post提交的数据必须放在消息主体中，但协议并没有规定数据必须使用什么编码方式，服务端通常根据请求头中的Content-Type字段来获知请求中的消息主体是用何种方式编码，再对主体进行解析
1.application/x-www-form-urlencoded，原生的form表单不设置enctype属性时默认就是这个方式提交这个数据，编码方式如key1=value1&key2=value2
2.application/form-data, 使用表单上传文件时，必须让from表单的enctype为multipart/from-data表明数据以multipart/from-data来编码
3.application/json 用来告诉服务端消息主体是序列化后的JSON字符串，ie低版本不支持
JSON.stringify，服务端语言也都有处理JSON的函数
4.text/xml,XML-RPC（XML Remote Procedure Call）。它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范。JavaScript中，也有现成的库支持以这种方式进行数据交互，能很好的支持已有的 XML-RPC 服务。
