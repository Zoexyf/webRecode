const Koa=require('Koa')
const Router=require('koa-router')
const static=require('koa-static')

let server=new Koa()
server.listen(8080)

let router=new Router()

router.get('/user',async ctx=>{

})

server.use(router.routes());


let staticRouter=new Router();
//建一个专门给static使用的router
staticRouter.all(/(\.jpg|\.png|\.gif)$/i,static('./static',{
    maxAge:60*86400*1000,

}))
staticRouter.all(/(\.css)$/i,static('./static',{
    maxAge:1*86400*1000,
    
}))
staticRouter.all(/(\.html|\.htm|\.shtml)$/i,static('./static',{
    maxAge:20*86400*1000,
    
}))
//其他文件统一缓存30天
staticRouter.all('',static('./static',{
    maxAge:30*86400*1000,
    
}))

// server.use(static('./static',{
//     maxAge:86400*1000,
//     index:'1.html',
// }))

server.use(staticRouter.routes());