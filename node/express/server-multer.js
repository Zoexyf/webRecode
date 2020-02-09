const express=require('express');
const multer=require('multer');

let server=express();
server.listen(8080);

//创建obj，并给其传参，dest上传的目录
let obj=multer({dest: './static/upload'});
server.use(obj.any());
//obj.any() 文件类型，任意都可，无限制

//
server.post('/reg', (req, res)=>{
  console.log(req.files);
    //同body-parser中 req.body一样，也是规定

  res.send('upload successed');
  //res.write('aaa'); 无法实现，因为，send之后已经将会话框end了
});
