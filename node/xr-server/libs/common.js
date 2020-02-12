const crypto=require('crypto')


module.exports={
    md5(buffer){
        //创建一个新的散列对象
        let obj=crypto.createHash('md5');
        obj.update('123456');

        return obj.digest('hex')
        //digest 进制 hex  16进制
    }
}