const Router=require('koa-router');
const fs=require('await-fs')
const path=require('path')
//不要引入config，去主文件里面引入
const common=require('../../libs/common');


let router=new Router();

//get方式的时候其实只是给了一个登陆页面,放在template的admin
router.get('/login',async ctx=>{
    await ctx.render('admin/login',{
        HTTP_ROOT:ctx.config.HTTP_ROOT,
        errmsg:ctx.query.errmsg,

    });
})

router.post('/login',async ctx=>{
    const {HTTP_ROOT}=ctx.config;
    //注意此处，先获得好username 与 password
    let {username,password}=ctx.request.fields;
    let admins=JSON.parse((await fs.readFile(
        path.resolve(__dirname,'../../admins.json')
    )).toString());

    function findAdmin(username){
        let a=null;
        admins.forEach(admin=>{
            if(admin.username==username)
            a=admin
        })
        return a;
    }
    let admin=findAdmin(username)
    
   
    if(!admin){
        //ctx.body='no this user'
        ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent('用户不存在')}`)
    }else if(admin.password!=common.md5(password)){
        ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent('密码不正确')}`)
    }else{
        //success
        // ctx.body='success';
        ctx.session['admin']=username;
        ctx.redirect(`${HTTP_ROOT}/admin/`)

    }
        // ctx.body=admins;
    
})

//当登录进去，验证session，
router.all('*',async (ctx,next)=>{
    const {HTTP_ROOT}=ctx.config;
    if(ctx.session['admin']){
        await next();
    }else{
        // ctx.body='你不是管理员'
        //重定向界面到login
        ctx.redirect(`${HTTP_ROOT}/admin/login`)
    }

})

router.get('/',ctx=>{
    const {HTTP_ROOT}=ctx.config;
    ctx.redirect(`${HTTP_ROOT}/admin/banner`)
})

//banner,先完成请求，后进行渲染
router.get('/banner',async ctx=>{
    const {HTTP_ROOT}=ctx.config;
    
    const table='banner_table';
    //数据库查找
    let datas=await ctx.db.query(`SELECT * FROM ${table}`)
    ctx.body=datas;

    await ctx.render('admin/table',{
        HTTP_ROOT,
        datas,
        action:`${HTTP_ROOT}/admin/banner`,
        // index.js中的fields可以从数据库中读出来，用于动态维护，
        fields:[
            {name:'title',type:'text'},
            {name:'src',type:'file'},
            {name:'href',type:'text'},
            {name:'serial',type:'number'},
        ]
        

    })

})
router.post('/banner',ctx=>{

    // fields完全来自于server.js中的koa-better-body
    let {title,src,href,serial}=ctx.request.fields;
    console.log(title,src,href,serial)
})


router.get('/catalog',async ctx=>{
    
})

router.get('/article',async ctx=>{
    
})


module.exports=router.routes();
