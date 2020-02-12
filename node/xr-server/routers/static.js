
const static=require('koa-static');
module.exports=function(router,options){

    options=options||{};
    options.image=options.image||30;
    options.script=options.script||1;
    options.styles=options.styles||30;
    options.html=options.html||30;
    options.other=options.other||7;

    //只有用路由的时候为use，请求时候为all
    router.all(/((\.jpg)|(\.png)|(\.gif))$/i,static('./static',{
        maxage:options.image*86400*1000,
    }))

    //一般js文件缓存一天
    router.all(/((\.js)|(\.jsx))$/i,static('./static',{
        maxage:options.script*86400*1000,
    }))

    //css文件缓存
    router.all(/(\.css)$/i,static('./static',{
        maxage:options.styles*86400*1000,
    }))


    router.all(/((\.html)|(\.htm))$/i,static('./static',{
        maxage:options.html*86400*1000,
    }))

    //其他文件，缓存一周
    router.all('*',static('./static',{
        maxage:options.other*86400*1000,
    }))
}