
const express=require('express');
const cookieSession=require('cookie-session');

let server=express()

server.listen(8080)

server.use(cookieSession({
    keys:['bcudakhfu','zuigfiu3i9gu','huaiye9ihf08fcnsi'],
    maxAge:20*60*1000,
    //session怕被劫持，所以需要有效期不能太长,一般默认20分钟
}))

server.get('/a',(req,res)=>{
   // console.log(req.session)
    if(!req.session['view']){
        req.session['view']=1

    }else{
        req.session['view']++
    }
    req.session['amount']=99.88;
    res.send(`第${req.session['view']}访问,您的amount为${req.session['amount']}`)
})