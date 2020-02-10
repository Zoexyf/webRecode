const koa=require('koa')
const Router=require('koa-router')

let server=new koa()
server.listen(8080)

let router=new Router();


server.use('/use',require('./routers/users'));