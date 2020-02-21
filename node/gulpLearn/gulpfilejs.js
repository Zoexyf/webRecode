const gulp=require('gulp')
const uglify=require('gulp-uglify')
const concat=require('gulp-concat')
const rename=require('gulp-rename')
const babel=require('gulp-babel')
const sourcemaps=require('gulp-sourcemaps')

//声明一个gulp的任务,可以很多任务
// gulp中是流操作
gulp.task('js',()=>{
    // gulp中是流操作   读取-》压缩-》输出
    return gulp
    // 1.读取
    .src(['./src/js/**/*.js'])
        // './src/js/*/*.js'  匹配一级别（user）目录下的js
        // './src/js/**/*.js'  匹配任意目录下的js
  
    // 2.连接—指定文件
    // .pipe(concat('bundle.min.js'))

    // 7.保留源码格式-init
    .pipe(sourcesmaps.init())

    // 5.Es6转换 .pipe(babel)
    .pipe(babel({
        presets:['@babel/env']
    }))

    // 3.压缩
    .pipe(uglify())
        // 无法成功，uglify不认ES6，前面先加babel编译可以实现
    // 6.重命名
    .pipe(rename({sufffix:'.min'}))
    
    // 7.保留源码格式-write
    .pipe(sourcemaps.write())

    // 4.输出-指定目录
    .pipe(gulp.dest('./build/js'))
});


// 默认任务
gulp.task('default',['js']);