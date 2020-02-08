
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
            <li class="pullDown">{{pullDownMsg}}</li>
            <li v-for="item in movieList" :key="item.id">
                <div class="info_list">
                    <h2>{{item.title}}</h2>
                    <p>观众评数量<span class="grade">{{item.useful_count}}人</span></p>
                    <p>查看原文链接:{{item.alt}}</p>
                    <p>{{item.summary}}</p>
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
    name:'Discuss',
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
        this.axios.get("/v2/movie/subject/26942674/reviews").then((res)=>{
            var status=res.status;
            if(status===200){
             this.movieList=res.data.reviews;
            //  console.log(res.data.subjects);
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
                this.axios.get("/v2/movie/subject/26942674/reviews").then((res)=>{
                    var status=res.status;
                    if(status===200){
                        this.pullDownMsg='更新成功';
                        setTimeout(() => {
                            this.movieList =res.data.reviews;
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