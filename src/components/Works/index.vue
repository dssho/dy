<template>
    <div class="movie_body" ref="movie_body">
        <!-- 等待图片 -->
        <Loading v-if="isLoading"></Loading>
        <!-- 下拉 -->
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
        <ul>
            <li class="pullDown">{{pullDownMsg}}</li>
            <li v-for="item in movieList" :key="item.id">
              <div>
                  <img :src="item.subject.images.small" style="width:100px;height:140px;" alt="">
                </div>
                <div class="info_list">
                    <h2>{{item.subject.title}}</h2>
                    <p> 类型:
                          <span v-for="i in item.subject.genres" :key="i.id">{{i}}  </span>
                   </p>
                    <p>时间:{{item.subject.year}}</p>
                    <p>查看原文链接:{{item.subject.alt}}</p>
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
    name:'Works',
    data(){
        return{
            movieList:[],
            // 下拉
            pullDownMsg:'',
            // 加载失败为true
            isLoading:true,
            // 上一次的城市id
            // prevCityId:-1
        }
    },
    // 用activated代替mounted
    // activated使用它是组件间切换时里边的数据也会再次出现
   activated(){
       this.isLoading=true;
        this.axios.get("/v2/movie/celebrity/1044707/works").then((res)=>{
            var status=res.status;
            if(status===200){
             this.movieList=res.data.works;
            //  console.log(this.movieList);
             // 数据加载成功
                this.isLoading=false;
            }
            
            // console.log(res);
        
        });
    },
    methods:{
        
        handleToScroll(pos){
            if(pos.y>30){
              this.pullDownMsg='正在更新中';
             }
           
        },
        handleToTouchEnd(pos){
            if(pos.y>30){
                this.axios.get("/v2/movie/celebrity/1044707/works").then((res)=>{
                    var status=res.status;
                    if(status===200){
                        this.pullDownMsg='更新成功';
                        setTimeout(() => {
                            this.movieList =res.data.works;
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
.movie_body .info_list{
    margin-left:10px;;
    flex:1;
    position:relative;
}
.movie_body .info_list h2{
    font-size:17px;
    line-height:24px;
    width:100%;
    overflow:hidden;
    /* 文本不换行 */
    /* white-space:nowrap; */
    /* 超出部分用省略号代替 */
    /* text-overflow:ellipsis; */
}
.movie_body .info_list p{
    font-size:13px;
    line-height:30px;
    width:100%;
    overflow:hidden;
    /* 文本不换行 */
    /* white-space:nowrap; */
    /* 超出部分用省略号代替 */
    /* text-overflow:ellipsis; */
}

.movie_body .pullDown{
    margin:0;
    padding:0;
    border:0;
}
</style>