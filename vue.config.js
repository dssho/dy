// 解决跨域问题
module.exports={
  publicPath:'/dy',
  devServer:{
    proxy:{
      // 反向代理
      '/v3':{
        target:"http://localhost:3000",
        changeOrigin:true
      },
      // 因为之后都是以v2为分界点
      '/v2':{
        target:"https://douban.uieee.com",
        changeOrigin:true
      }
    },
    public:'192.168.0.107:8080',
    hot:true,
    disableHostCheck:true,
   
     
    
  }
}