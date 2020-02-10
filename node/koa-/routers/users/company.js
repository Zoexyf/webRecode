const Router=require('koa-router')
let Router=new Router();
    Router.get('/c',async ctx=>{
        ctx.body='compang de a'
    })

module.exports=Router.routes();