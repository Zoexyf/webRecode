//目的：本地一套，服务器一套
const process=require('process');
//process模块，获取当前进程的信息

//process.env环境变量os操作系统内核
//console.log(process.env.OS)

let mode=(process.env.OS=='window_NT'?'dev':'prod');

module.exports={
    mode,
    ...(mode=='dev'?require('./config.dev'):require('./config.prod')),
    //应该为json格式，加。。。直接展开
}