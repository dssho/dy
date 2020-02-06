<template>
    <div class="movie_body" ref="movie_body">
        <!-- 等待图片 -->
        <Loading v-if="isLoading"></Loading>
        <!-- 下拉 -->
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
        <ul>
            <!-- <li>
                <div class="pic_show">
                    <img src="/images/movie_1.jpg" alt="">
                </div>
                <div class="info_list">
                    <h2>无名之辈</h2>
                    <p>观众评 <span class="grade">9.2</span></p>
                    <p>主演:陈建斌</p>
                    <p>今天共反映500场</p>
                </div>
                <div class="btn_mall">购票</div>
            </li>
            -->
          
            <!-- <li v-for="item in movieList" :key="item.id">
                <div class="pic_show"> -->
         <!-- "img":"http://p1.meituan.net/w.h/movie/967b253953bc7e660cfadbf9d78f67b62852693.jpg" -->
         <!-- 地址中有w.h 即宽乘高  用过滤器 在main.js中设置过滤器 -->
                    <!-- <img :src="item.images | setWH('128.180')" alt=""> -->
                    <!-- <img :src="item.images.medium" style="height:90px" alt="" />
                </div>
                <div class="info_list">
                    <h2>{{item.title}}</h2>
                    <p>观众评 <span class="grade">{{item.rating.average}}</span></p>
                    <p v-for="i in item.casts" :key="i.id">主演:{{i.name}}</p>
                    <p>{{item.genres}}</p>
                </div>
                <div class="btn_mall">购票</div>
            </li> -->

                 <!-- 添加li 渲染下拉 -->
                 <li class="pullDown">{{pullDownMsg}}</li>
                <li v-for="item in movieList" :key="item.id">
                    <!--  @tap="handleToDetail"跳到详情页 -->
                    <div class="pic_show" @tap="handleToDetail"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2>{{ item.nm }} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
                        <p>观众评 <span class="grade">{{ item.sc }}</span></p>
                        <p>主演: {{ item.star }}</p>
                        <p>{{ item.showInfo }}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
        </ul>
     </Scroller>
    </div>
</template>
<script>
// 使滑动更流畅
// 因为每个都需要所以做成一个组件
// import BScroll from "better-scroll";
export default {
    name:'NowPlaying',
    data(){
        return{
            movieList:[],
            // 下拉
            pullDownMsg:'',
            // 加载失败为true
            isLoading:true,
            // 上一次的城市id
            prevCityId:-1
        }
    },
    // 用activated代替mounted
    // activated使用它是组件间切换时里边的数据也会再次出现
   activated(){
        // this.axios.get('/v2/movie/in_theaters').then((res)=>{
        //     var status=res.status;
        //     if(status===200){
        //      this.movieList=res.data.subjects;
        //     //  console.log(res.data.subjects);
        //     //  console.log(this.movieList);
        //     }
            
        //     // console.log(res);
        
        //  console.log(123);
        var cityId=this.$store.state.city.id;
        // 如果她两相等说明就不用切换城市
        if( this.prevCityId===cityId){
            return;
        }
         this.isLoading=true;
         console.log(123);
         this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
            //  console.log(res);
            var msg = res.data.msg;
            if( msg === 'ok' ){
                this.movieList = res.data.data.movieList;
                // 数据加载成功
                this.isLoading=false;
                // 对 prevCityId进行赋值
                 this.prevCityId=cityId;

                //  new BScroll 使用它有两点 等数据全部渲染完才可以执行，里边框要大于外边框时才可以做操作(比如点击操作，点击跳转详情页)
                // 保证数据赋值后，界面渲染完,再去触发下边的
                // this.$nextTick(()=>{
                //    // 等数据完才可调用
                // //    两个参数  1.找到包裹的容器
                //              // 2.配置对象
                // // 做下拉更新，先赋值一下
                //   var scroll=new BScroll(this.$refs.movie_body,{
                //     //   如果想要handleToDetail能点击跳转，必须先开启tap
                //       tap:true,
                //     //   scroll配置 查better-scroll api即有
                //     // 滚动的时候会派发scroll事件,会节流
                //     probeType:1
                //   });
                // //   添加一个scroll方法
                // // pos检测到当前的位置
                // scroll.on('scroll',(pos)=>{
                //     // 要想使用，先配置
                //     // console.log('scroll')
                //     if(pos.y>30){
                //       this.pullDownMsg='正在更新中';
                //     }
                //  });
                //   //    添加touchend方法
                // scroll.on('touchEnd',(pos)=>{
                // //   console.log('touchend');
                //  if(pos.y>30){
                //     this.axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
                //       var msg = res.data.msg;
                //       if( msg === 'ok' ){
                //           this.pullDownMsg='更新成功';
                //           setTimeout(() => {
                //                this.movieList = res.data.data.movieList;
                //                this.pullDownMsg='';
                //           }, 1000);
                       
                //        }
                //     });
                //   }
                //  });
                // });
           
            }
        });
    },
    methods:{
        handleToDetail(){
            console.log("handleToDetail");
        },
        handleToScroll(pos){
            if(pos.y>30){
              this.pullDownMsg='正在更新中';
             }
           
        },
        handleToTouchEnd(pos){
            if(pos.y>30){
                this.axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
                    var msg = res.data.msg;
                    if( msg === 'ok' ){
                        this.pullDownMsg='更新成功';
                        setTimeout(() => {
                            this.movieList = res.data.data.movieList;
                            this.pullDownMsg='';
                        }, 1000);
                    
                    }
                });
            }
        }
    }
}
</script>
<style scoped>
 .movie_body{
     margin-top:96px;
   display:flex;
   width:100%;
   position:absolute;
   top:0;
   bottom:0;
 }
 .movie_body ul{
     flex:1;
     /* margin:0 12px; */
     overflow:auto;
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
.movie_body .info_list .grade{
    font-size:15px;
    color:#faaf00;
    font-weight:700;
}
.movie_body .info_list img{
    width:50px;
    position:absolute;
    right:10px;
    top:5px;
}
.movie_body .btn_mall{
    width:47px;
    height:27px;
    line-height:28px;
    text-align:center;
    background-color:#f03d37;
    color:#fff;
    border-radius:4px;
    font-size:12px;
    cursor:pointer;
}
.movie_body .pullDown{
    margin:0;
    padding:0;
    border:0;
}
</style>