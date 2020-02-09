const express=require('express')
const cookieParser=require('cookie-parser')

let server=express()
server.listen(8080)

server.use(cookieParser(
    'husiefaiuwouf9eqy82hufhay'
))

server.get('/a',(req,res)=>{
    
    //显示当前浏览器的cookie，req.cookies（cookie不可以）
    console.log('cookie',req.cookies)//未签名的
    console.log('signedCookies',req.signedCookies)//已签名的
    //cookie大小只有4K，对签名有限制
    

    //添加cookie;可以添加有效期等该cookie的其他选项
    res.cookie('amount',99.0,{
        //domain:'baidu.com',
        //path:'/',
        //httpOnly:true,
        //httpOnly只能由服务器操作，可增加安全性，避免前台误操作；
        maxAge:14*86400*1000,
        //secure:true,
        //secure 只有HTTPS的情况下才可以使用。
        signed:true,
        //signed 表示所添加的cookie为已签名的;如果浏览器进行数据操作，会出现amount：false
        })
    res.send('ok')
})

