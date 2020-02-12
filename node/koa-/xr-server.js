const Koa=require('koa');
const ejs=require('koa-ejs');
const path=require('path');

let server=new Koa()
server.listen(8000)

//与server.use()不同
ejs(server,{
    root:path.resolve(__dirname,'xr-template'),
    //root：根，到哪里去找模板文件
    layout:false,
    //layout:'abc' 多加一层文件夹
    viewExt:'ejs',
    //viewExt：视图文件的扩展名
    cache:false,
    //cache：是否缓存，开发环境用false，发布环境用true
    debug:false,
    //debug:true会输出编译模板，一般为false

})

//
server.use(async ctx=>{
    await ctx.render('2',{
        arr:[12,5,8,99,37]
    })
    //加了渲染引擎之后出现的ctx.render
})