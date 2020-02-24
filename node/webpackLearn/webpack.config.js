const path=require('path');

module.exports={
//   mode: 'development',
  entry:'./src/js/1.js',
    //多入口
//   entry: {
//     index:'./src/js/1.js',
//     admin:'./src/js/2.js'
//   },
  
  output: {
    path: path.resolve(__dirname, 'build'),
    // filename:'[name].min.js'
    filename:'bunde.min.js'
   
  },

  module:{
      rules:[
        //   由后到前，注意顺序
          {test:/\.css$/,use:['style-loader','css-loader']}
      ]
  }
 
};
