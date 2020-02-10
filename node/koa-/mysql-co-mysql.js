const Koa=require('koa')
const Router=require('koa-router')
const mysql=require('mysql')
const co=require('co-mysql')

let conn=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:''
})

let server=new Koa()
server.listen(8080);


