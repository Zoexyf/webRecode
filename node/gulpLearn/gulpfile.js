const gulp=require('gulp')
const cssmin=require('gulp-cssmin')
const concat=require('gulp-concat')
const rename=require('gulp-rename')
const babel=require('gulp-babel')
const sourcemaps=require('gulp-sourcemaps')
const imagemin=require('gulp-imagemin')

const js_path=['./src/js/**/*.js']

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

// css压缩
gulp.task('style',()=>{
    return gulp
    .src(['./src/css/**/*.css'])
    .pipe(concat('style.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./build/css'))
    
})

// 图片压缩
gulp.task('image',()=>{
    return gulp
    .src(['./src/img/**/*.jpg','./src/img/**/*.gif','./src/img/**/*.png'])
    .pipe(imagemin([
        // 隔行扫描
        imagemin.gifsicle({interlaced:true}),
        // 渐进式加载progressive
        imagemin.jpegtran({propressive:true}),
        // png 无损压缩，优化比较难,5是最高级
        imagemin.optipng({optimizationLevel:5})

    ]))
    .pipe(gulp.dust('./build/img/'))
})

// watch 监视
gulp.task('watch',()=>{
    gulp.watch(js_path,['js'])
})
// 有了后序新的变化继续执行

// 默认任务
gulp.task('default',['js','watch']);