const Koa=require('koa');
const Router=require('koa-router');

let server=new Koa();
server.listen(8080);

//
let router=new Router();


router.get('/news/:id/', async (ctx, next)=>{
  let {id}=ctx.params;

  ctx.body='bbb';

  await next();//要调用下一级，必须使用await；下一级是个async函数
    //不使用await next（），则不会执行下一级，自上而下执行
});
router.get('/news/1/', async ctx=>{
  let {id}=ctx.params;

  ctx.body+='aaa';//bbbaaa,前后均赋值则会覆盖
});

server.use(router.routes());
