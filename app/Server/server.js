//引入express中间件
var express = require('express');
var app = express();

//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(express.static('../dist'));
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})
//监听端口为3000
app.listen(3000, function () {
  console.log(' app listening at http://localhost:3000');
});
