const Koa=require('koa')
const Router=require('koa-router')
const session=require('koa-session')


let server=new Koa()
server.listen(8080);


//签名
server.keys=[
    'hdu9w8fgfg7e8gi',
    'hd832gf9f0fvuew9',
    '9whdiaty78ef7jgdoa'
];
server.use(session({
    maxAge:20*60*1000,  //有效期
    renew:true,         //自动续期
},server));

server.use(async ctx=>{
    if(!ctx.session){
        ctx.session['view']=1;
    }
    ctx.session['view']++
    ctx.body=`welcome to the net at ${ctx.session['view']} times`
})