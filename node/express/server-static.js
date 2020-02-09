const express=require('express')
let server=express();
server.listen(8080);

//server.use(express.static('./static/'));
//从上往下执行，被static满足了就不会向下执行，会把有些接口屏蔽
server.get('/a',(req,res,next)=>{
    res.send('aaa');
})

server.get('/b',(req,res,next)=>{
    res.send('bbb');
})

server.use(express.static('./static/'));
//习惯放在最后，进行文件处理