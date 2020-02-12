const Router=require('koa-router');

let router=new Router();

router.use('/news',ctx=>{
    ctx.body='wwwaaa'
})

module.exports=router.routes();