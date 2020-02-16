// 解决跨域问题
module.exports={
  publicPath:'/dy',
  devServer:{
    proxy:{
      // 反向代理
      '/v3':{
        target:"http://localhost:5050",
        changeOrigin:true
      },
      // 因为之后都是以v2为分界点
      '/v2':{
        target:"https://douban.uieee.com",
        changeOrigin:true
      }
    },
    public:'192.168.0.107:8080/dy',
    hot:true,
    disableHostCheck:true,
  },
  //webpack配置
	configureWebpack: {
    //关闭 webpack 的性能提示
    performance: {
      hints:false
    },

    //或者

    //警告 webpack 的性能提示
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }

}