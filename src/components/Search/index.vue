<template>
    <div class="search_body">
      <div class="search_input">
        <div class="search_input_wrapper">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" v-model="message">
        </div>
      </div>
      <div class="search_result">
        <h3>电影/电视剧/综艺</h3>
        <ul>
          <!-- <li>
            <div class="img">
              <img src="/images/movie_1.jpg" alt="">
            </div>
            <div class="info">
              <p>
                <span>无名之辈</span>
                <span>8.5</span>
              </p>
              <p>A Cool Fish</p>
              <p>剧情,喜剧,犯罪</p>
              <p>2018-11-16</p>
            </div>
          </li>
          <li>
            <div class="img">
              <img src="/images/movie_1.jpg" alt="">
            </div>
            <div class="info">
              <p>
                <span>无名之辈</span>
                <span>8.5</span>
              </p>
              <p>A Cool Fish</p>
              <p>剧情,喜剧,犯罪</p>
              <p>2018-11-16</p>
            </div>
          </li> -->
          <li v-for="item in moviesList" :key="item.id">
            <div class="img">
              <!-- setWH('')要加引号，不然图片失真 -->
              <img :src="item.img | setWH('128.180')" alt=""/>
            </div>
            <div class="info">
              <p>
                <span>{{item.nm}}</span>
                <span>{{item.sc}}</span>
              </p>
              <p>{{item.enm}}</p>
              <p>{{item.cat}}</p>
              <p>{{item.rt}}</p>
            </div>
          </li> 
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  name:'Search',
  data(){
    return{
      message:'',
      moviesList:[]
    }
  },
  methods:{
    // axios自带的防抖方法
    cancelRequest(){
            if(typeof this.source ==='function'){
                this.source('终止请求')
            }
        }
  },
  watch:{
    message(newVal){
      var that=this;
      // 调用
      this.cancelRequest();
      // console.log(newVal);
      // 处理防抖，防止多次触发用定时器或axios自带的方法
      // clearTimeout()
      // setTimeout()
      this.axios.get('/api/searchList?cityId=10&kw='+newVal, {   
        // 处理防抖          
                cancelToken: new this.axios.CancelToken(function(c) {
                    that.source = c;
                })
            }).then((res)=>{
        var msg=res.data.msg;
        var movies=res.data.data.movies;
        if(msg&&movies){
          this.moviesList=res.data.data.movies.list;
        }
      }).catch((err) => {// 处理防抖
                if (this.axios.isCancel(err)) {
                    console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                } else {
                    //handle error
                    console.log(err);
                }
            })     ;
    }
  }
}
</script>
<style scoped>
.search_body{
  flex:1;
  overflow:auto;
}
.search_body .search_input{
  padding:8px 10px;
  background-color:#f5f5f5;
  border-bottom:1px #e5e5e5 solid;
}
.search_body .search_input_wrapper{
 padding:0 10px;
 border:1px #e6e6e6 solid;
 border-radius:5px;
 background-color:#fff;
 display:flex;
 line-height:20px;
}
.search_body .search_input_wrapper i{
  font-size:16px;
  padding:4px 0;
}
.search_body .search_input_wrapper input{
  border:none;
  font-size:13px;
  color:#333;
  padding:4px 0;
  outline:none;
  margin-left:5px;
  width:100%;
}
.search_body .search_result h3{
  font-size:15px;
  color:#999;
  padding:9px 15px;
  border-bottom:1px #e6e6e6 solid;
}
.search_body .search_result ul li{
 border-bottom:1px #c9c9c9 dashed;
 padding:10px 15px;
 box-sizing:border-box;
 display:flex;
}
.search_body .search_result .img{
  width:60px;
  float:left;
}
.search_body .search_result .img img{
  width:100%;
}
.search_body .search_result .info{
  float:left;
  margin-left:15px;
  flex:1;
}
.search_body .search_result .info p{
  height:22px;
  display:flex;
  line-height:22px;
  font-size:12px;
}
/* p:nth-of-type(1)指定每个P元素匹配类型中的第1个统计兄弟元素 */
/* span:nth-of-type(1)指定每个span元素匹配类型中的第1个统计兄弟元素的字号 */
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){
  font-size:18px;
  flex:1;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){
  font-size:16px;
  color:#fc7103;
}
</style>