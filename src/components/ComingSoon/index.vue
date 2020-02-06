<template>
  <div class="movie_body">
    <Loading v-if="isLoading"></Loading>
    <Scroller v-else>
    <ul>
      <!-- <li>
        <div class="pic_show">
          <img src="/images/movie_1.jpg" alt="">
        </div>
        <div class="info_list">
          <h2>无名之辈</h2>
          <p><span class="person">177</span>人想看</p>
          <p>主演:陈建斌</p>
          <p>2018-11-30上映</p>
        </div>
        <div class="btn_pre">预售</div>
      </li>
      <li>
        <div class="pic_show">
          <img src="/images/movie_1.jpg" alt="">
        </div>
        <div class="info_list">
          <h2>无名之辈</h2>
          <p><span class="person">177</span>人想看</p>
          <p>主演:陈建斌</p>
          <p>2018-11-30上映</p>
        </div>
        <div class="btn_pre">预售</div>
      </li> -->

      <!-- <li v-for="item in comingList" :key="item.id">
        <div class="pic_show">
           <img :src="item.images.medium" style="height:90px" alt="" />
        </div>
        <div class="info_list">
          <h2>{{item.title}}</h2>
          <p><span class="person">{{item.collect_count}}</span>人收藏</p>
          <p  v-for="i in item.casts" :key="i.id">主演:{{i.name}}</p>
          <p>{{item.genres}}</p>
          <p>{{item.pubdates[0]}}上映</p>
        </div>
        <div class="btn_pre">预售</div>
      </li>  -->
      <li v-for="item in comingList" :key="item.id">
        <div class="pic_show">
          <img :src="item.img | setWH('128.180')">
          </div>
        <div class="info_list">
        <h2>{{ item.nm }} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
        <p><span class="person">{{ item.wish }}</span> 人想看</p>
        <p>主演: {{ item.star }}</p>
        <p>{{ item.rt }}上映</p>
        </div>
        <div class="btn_pre">
        预售
        </div>
      </li>
    </ul>
    </Scroller>
  </div>
</template>
<script>
export default {
  name:'ComingSoon',
  data(){
    return{
      comingList:[],
       // 加载失败为true
      isLoading:true,
      prevCityId:-1
    }
  },
  activated(){
    // this.axios.get('/v2/movie/coming_soon').then((res)=>{
    //    var status=res.status;
    //         if(status===200){
    //          this.comingList=res.data.subjects;
    //         //  console.log(res.data.subjects);
    //         //  console.log(this.movieList);
    //         }
            
    //         console.log(res);
     var cityId=this.$store.state.city.id;
        // 如果她两相等说明就不用切换城市
        if( this.prevCityId===cityId){
            return;
        }
         this.isLoading=true;
         console.log(123);
    this.axios.get('/api/movieComingList?cityId='+cityId).then((res)=>{
      var msg = res.data.msg;
      if(msg === 'ok'){
          this.comingList = res.data.data.comingList;
           // 数据加载成功
           this.isLoading=false;
           // 对 prevCityId进行赋值
            this.prevCityId=cityId;
     }

    });
  }
}
</script>
<style scoped>
 .movie_body{
     flex:1;
     overflow:auto;
 }
 .movie_body ul{
     margin:0 12px;
     overflow:hidden;
 }
.movie_body ul li{
     margin:12px;
     display:flex;
     align-items:center;
     border-bottom:1px #e6e6e6 solid;
     padding-bottom:10px;
 }
.movie_body .pic_show{
     width:64px;
     height:90px;
 }
.movie_body .pic_show img{
    width:100%;
}
.movie_body .info_list{
    margin-left:10px;;
    flex:1;
    position:relative;
}
.movie_body .info_list h2{
    font-size:17px;
    line-height:24px;
    width:150px;
    overflow:hidden;
    /* 文本不换行 */
    white-space:nowrap;
    /* 超出部分用省略号代替 */
    text-overflow:ellipsis;
}
.movie_body .info_list p{
    font-size:13px;
    line-height:22px;
    width:200px;
    overflow:hidden;
    /* 文本不换行 */
    white-space:nowrap;
    /* 超出部分用省略号代替 */
    text-overflow:ellipsis;
}
.movie_body .info_list img{
    width:50px;
    position:absolute;
    right:10px;
    top:5px;
}
.movie_body .btn_pre{
    width:47px;
    height:27px;
    line-height:28px;
    text-align:center;
    background-color:#3c9fe6;
    color:#fff;
    border-radius:4px;
    font-size:12px;
    cursor:pointer;
}
</style>