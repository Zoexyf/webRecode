//需要写入文件，引入fs
const fs=require('fs');

const KEY_LEN=1024;
const KEY_COUNT=2048;
const CHARS='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>?,./;[]{}*^%$@';

let arr=[]
for(let i=0;i<KEY_COUNT;i++){
    let key='';

    for(let j=0;j<KEY_COUNT;j++){
        key+=CHARS[Math.floor(Math.random()*CHARS.length)]

    }
    arr.push(key);
}

fs.writeFileSync('./.keys',arr.join('\n'))

console.log(`generated ${KEY_COUNT} keys`)

//keys已经生成好了，主server引入