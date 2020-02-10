const Koa=require('koa')
const Router=require('koa-router')


let server=new Koa()
server.listen(8080);


//签名
server.keys=[
    'hdu9w8fgfg7e8gi',
    'hd832gf9f0fvuew9',
    '9whdiaty78ef7jgdoa'
];
server.use(async ctx=>{
    ctx.cookies.set('user','blue',{
        maxAge:14*86400*1000,
        signed:true
    });
    //console.log( ctx.cookies.get('user',{signen:true}) );
})