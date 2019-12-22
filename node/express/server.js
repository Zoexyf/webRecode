const express=require('express');

let server=express();
server.listen(8080);
//express自带路由


//为了不被回调等影响，加入第三个next参数，可以将一个请求拆分多个
server.get('/a', (req, res, next)=>{
  console.log('a');

  //res.send();
  //里面可以放任意参数，直接发送

  req.usertype=5;

  throw new Error('aaaa');

  next();
});
server.get('/a', (req, res, next)=>{
  console.log(req.usertype);
});
