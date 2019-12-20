// //目的：本地一套，服务器一套
// const process=require('process');
// //process模块，获取当前进程的信息

// //process.env环境变量os操作系统内核
// //console.log(process.env.OS)

// let mode=(process.ebv.OS=='window_NT'?'dev':'prod')

const dev=require('./config');

const db=require('./libs/database');

(async ()=>{
    let data=await db.query('SELECT * FROM item_table');
    console.log(data)
})()