const Router=require('koa-router')

let router=new Router()

router.get('/',async ctx=>{
    ctx.body='user';
})

router.use('/company',require('./company'))
router.use('/admin',require('./admin'))

module.exports=Router.routes();