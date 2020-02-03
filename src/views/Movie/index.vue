<template>
  <div id="main">
      <Header title="电影"></Header>
      <div id="content">
        <div class="movie_menu">
          <router-link class="city_name" tag="div" to="/movie/city">
            <span>北京</span>
            <i class="iconfont icon-lower-triangle"></i>
          </router-link>
          <div class="hot_swtich">
            <router-link class="hot_item"  tag="div" to="/movie/nowPlaying">正在热映</router-link>
            <router-link class="hot_item" tag="div" to="/movie/comingSoon">即将上映</router-link>
          </div>
          <router-link class="search_entry" tag="div" to="/movie/search">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
        </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      </div>
      <TabBar></TabBar>
  </div>
</template>
<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
export default {
  name:'Movie',
  components:{
    Header,
    TabBar
  }
}
</script>

<style scoped>
 /* #main{
   height:100%;
   display:flex;
   flex-direction:column;
 } */
 /*#content{*/
   /* flex是flex-grow,flex-shrink,flex-basis的缩写 */
   /* flex-grow:1 div将以与窗口大小相同比列增长 */
   /* flex-shrink:1 div将以与窗口大小相同的比列缩小 */
   /* flex-basis:0 div没有这样的起始值，并且根据可用的屏幕大小占用屏幕 */
  /* flex:1;
   overflow:auto;
   margin-bottom:50px;
   position:relative;
   display:flex;
   flex-direction:column;
 } */
 #content .movie_menu{
   width:100%;
   height:45px;
   display:flex;
   justify-content: space-between;
   border-bottom:1px solid #e6e6e6;
   align-items: center;
   background:#fff;
   z-index:10;
 }
 .movie_menu .city_name{
   margin-left:20px;
   height:100%;
   line-height:45px;
 }
 .movie_menu .city_name.active{
   color:#ef4238;
   border-bottom:2px #ef4238 solid;
 }
 .movie_menu .city_name.router-link-active{
   color:#ef4238;
   border-bottom:2px #ef4238 solid;
 }
 .movie_menu .hot_swtich{
   display:flex;
   height:100%;
   line-height:45px;
   
 }
 .movie_menu .hot_item{
   font-size:15px;
   color:#666;
   width:80px;
   text-align:center;
   margin:0 12px;
   font-weight: 700;
 }
 .movie_menu .hot_item.active{
   color:#ef4238;
   border-bottom:2px #ef4238 solid;
 }
 .movie_menu .hot_item.router-link-active{
   color:#ef4238;
   border-bottom:2px #ef4238 solid;
 }
 .movie_menu .search_entry{
   margin-right:20px;
   height:100%;
   line-height:45px;
 }
 .movie_menu .search_entry.active{
    color:#ef4238;
   border-bottom:2px #ef4238 solid;
 }
 .movie_menu .search_entry.router-link-active{
    color:#ef4238;
   border-bottom:2px #ef4238 solid;
 }
 .movie_menu .search_entry i{
   font-size:24px;
   color:#f00;
 }
</style>