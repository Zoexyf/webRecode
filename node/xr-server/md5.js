const crypto=require('crypto')
//node自带库，crypto密码学，专门用来做加密解密，散列等事情

//创建一个新的散列对象
let obj=crypto.createHash('md5');
obj.update('654321');

console.log(obj.digest('hex'))
//digest 进制 hex  16进制