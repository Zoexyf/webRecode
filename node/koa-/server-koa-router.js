const koa=require('koa')
const Router=require('koa-router')

let server=new koa()
server.listen(8080)

let router=new Router();
let userRouter=new Router();
    let companyRouter=new Router();
    companyRouter.get('/c',async ctx=>{
        ctx.body='compang de a'
    })
    let admainRouter=new Router();
    admainRouter.get('/c',async ctx=>{
        ctx.body='admain de a'
    })
userRouter.get('/',async ctx=>{
    ctx.body='user'
})
userRouter.use('/company',companyRouter.routes())
userRouter.use('/admain',admainRouter.routes())

router.use('/user',userRouter.routes());

// router.get('/a',async ctx=>{
//     ctx.body='aaa';

// })
//router.get('/a',async (ctx,next)=>{})
//此时路由并没有挂载到服务器上
server.use(router.routes())