const Koa=require('koa')
const Router=require('koa-router')
const mysql=require('mysql')
const co=require('co-mysql')

let conn=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'20191217'
})

let db=co(conn);

let server=new Koa()
server.listen(8000);

server.context.db=db;
//全局声明以后，可以用ctx.db直接使用，比较方便
server.use(async ctx=>{
   let data=await ctx.db.query('SELECT * FROM item_table')
   ctx.body=data;
})


