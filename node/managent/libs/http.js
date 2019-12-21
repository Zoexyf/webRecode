const http=require('http')
const url=require('url')
const querystring=require('querystring')
const zlib=require('zlib')
const fs=require('fs')
const {Form}=require('multiparty');
const router=require('./router')

const {HTTP_PORT,HTTP_ROOT,HTTP_UPLOAD}=require('../config')



http.createServer((req,res)=>{
    res.writeJson=function(json){
        res.setHeader('concet-type','application/json');
        //数据传输时需要在头部设置数据传输格式
        res.write(JSON.stringify(json));

    }

    //1.解析数据——GET,POST，FILE
    let {pathname,query}=url.parse(req.url);
    if(req.method=='POST'){
    //两种POST,一种普通数据，一种二进制数据（用multiparty处理）
    
    //1.1普通POST请求
    if(req.headers['concent-type'].startsWith('application/x-www-form-urlencoded')){
        
        let arr=[]
        req.on('data',buffer=>{
            arr.push(buffer)
        })
        req.on('end',()=>{
            let post=querystring.parse(Buffer.concat(arr).toString());
        
        //2.找路由
        handle(req.method, pathname, query, post, {});
        })
    }else{
        //1.2文件post请求处理
        let form=new Form({
            uploadDir:HTTP_UPLOAD
        })
        form.parse(req)

        let post={}
        let files={}

        form.on('filed',(name,value)=>{
            post[name]=value;
        })
        form.on('file',(name,file)=>{
            files[name]=file;
        })
        form.on('error',err=>{
            console.log(err)
        })
        form.on('close', ()=>{
            //找路由
            handle(req.method, pathname, query, post, files);
          });

    }
}else{
    //2.找路由
    handle(req.method, pathname, query, {}, {})

    
}

//handle函数定义
   async function handle(method,url,get,post,files){
    let fn=router.findRouter(method,url)

    if(!fn){
        //文件请求

        let filepath=HTTP_ROOT+pathname;

        fs.stat(filepath,(err,stat)=>{
            if(err){
                //出错封装，抛出异常
                res.writeHeader(404);
                res.write('NOT FOUND');
                res.end();
            }else{
                //此时有文件
                let rs=fs.createReadStream(filepath)
                let gz=zlib.createGzip();

                res.on('error',()=>{});
                res.setHeader('content-encoding','gzip');
                res.pipe(gz).pipe(res);
            }
        })
    }else{
        //接口请求
        //如果出错不能影响服务器运行，使用try catch;
        try{
           await fn(url,get,post,files)
        }catch{
            res.writeHead(500);
            //表示服务器错误
            res.write('Internal Server Error');
            res.end()
        }
        

    }
}

}).listen(7070);

console.log(`server started at ${HTTP_PORT}`)