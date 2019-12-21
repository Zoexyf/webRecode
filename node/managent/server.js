// //目的：本地一套，服务器一套
// const process=require('process');
// //process模块，获取当前进程的信息

// //process.env环境变量os操作系统内核
// //console.log(process.env.OS)

// let mode=(process.ebv.OS=='window_NT'?'dev':'prod')

// const dev=require('./config');

// const db=require('./libs/database');

// (async ()=>{
//     let data=await db.query('SELECT * FROM item_table');
//     console.log(data)
// })()

const db=require('./libs/database');
const http=require('./libs/http');
const {addRouter}=require('./libs/router');

addRouter('get', '/list', async (res, get, post, files)=>{
  try{
    let data=await db.query(`SELECT * FROM item_table`);
    res.writeJson({error: 0, data});
  }catch(e){
    res.writeJson({error: 1, msg: 'database error'});
  }

  res.end();
});
addRouter('post', '/add', async (res, get, post, files)=>{
  let {title,price,count}=post;

  if(!title || !price || !count){
    res.writeJson({error: 1, msg: 'params invaild'});
    res.end();
  }else{
    price=Number(price);
    count=Number(count);

    if(isNaN(price) || isNaN(count)){
      res.writeJson({error: 1, msg: 'params invaild'});
      res.end();
    }else{
      try{
        await db.query('INSERT INTO item_table (title, price, count) VALUES(?,?,?)', [title, price, count]);

        res.writeJson({error: 0, msg: 'success'});
      }catch(e){
        res.writeJson({error: 1, msg: 'database error'});
      }
      res.end();
    }
  }
});
addRouter('get', '/del', async (res, get, post, files)=>{

});
