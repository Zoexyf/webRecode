const Koa=require('koa');
const Router=require('koa-router');
const static=require('./routers/static')
const body=require('koa-better-body')
const path=require('path');
const session=require('koa-session')
const fs=require('fs')
const ejs=require('koa-ejs')
const config=require('./config')


let server=new Koa();
server.listen(config.PORT);
console.log(`server running at ${config.PORT}`)

//中间件 koa-better-body
server.use(body({
    //最好使用绝对路径
    uploadDir:path.resolve(__dirname,'./static/upload'),
    
}))

//session
server.keys=fs.readFileSync('./.keys').toString().split('\n');
server.use(session({
    maxAge:20*60*1000,
    renew:true,//自动续期

},server))

//数据库，一般单给文件lib/database
server.context.db=require('./libs/database')
// 此处将db引入context上,同理可将congfig加到ctx上
server.context.config=config;

//渲染
ejs(server,{
    root:path.resolve(__dirname,'template'),
    layout:false,
    viewExt:'ejs',
    cache:false,
    debug:false
})

//统一处理
// server.use(async (ctx,next)=>{
//     try{
//         await next();

//         //正常的处理 ctx.body
//     }catch(e){
//         // ctx.state=500;
//         // ctx.body='Internal Server Error';
//         // 状态码有问题

//         ctx.throw(500,'Internal Server Error')
//     }
// })


//路由和static 
let router=new Router();

router.use('/admin',require('./routers/admin'));

router.use('/',require('./routers/www'))
static(router)

server.use(router.routes())