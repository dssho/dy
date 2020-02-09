// 解决跨域问题
module.exports={
  devServer:{
    proxy:{
      // 因为之后都是以v2为分界点
      '/v2':{
        target:"https://douban.uieee.com",
        changeOrigin:true
      }
    //   '/api' : {
    //     target : 'http://39.97.33.178',
    //     changeOrigin : true
    // }
    },
    public:'192.168.0.107:8080',
    hot:true,
    disableHostCheck:true,
   
     
    
  }
}