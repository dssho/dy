<template>
    <div class="movie_body">
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
            <li>
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
            <li>
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
            <li>
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
            <li>
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
            <li>
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
            <li>
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
            <li>
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
            </li> -->
            <li v-for="item in movieList" :key="item.alt">
                <div class="pic_show">
         <!-- "img":"http://p1.meituan.net/w.h/movie/967b253953bc7e660cfadbf9d78f67b62852693.jpg" -->
         <!-- 地址中有w.h 即宽乘高  用过滤器 在main.js中设置过滤器 -->
                    <img :src="item.images | setWH('128.180')" alt="">
                </div>
                <div class="info_list">
                    <h2>{{item.title}} <img v-if="item.version" src="@/assets/maxs.png"/></h2>
                    <p>观众评 <span class="grade">{{item.rating.average}}</span></p>
                    <p>主演:{{item.casts.name_en}}</p>
                    <p>{{item.genres}}</p>
                </div>
                <div class="btn_mall">购票</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'NowPlaying',
    data(){
        return{
            movieList:[]
        }
    },
    mounted(){
        this.axios.get('https://douban.uieee.com/v2/movie/in_theaters').then((res)=>{
            var status=res.status;
            
            if(status==='200'){
             this.movieList=res.data.subjects;
            }
            console.log(this.movieList);
            console.log(res);
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
</style>