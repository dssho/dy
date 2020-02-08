<template>
  <div id="main">
      <Header title="榜单"></Header>
      <div id="content">
        <div class="movie_menu">
          <router-link class="city_name" tag="div" to="/top/week">
            <span>周榜</span>
          </router-link>
          <div class="hot_swtich">
            <router-link class="hot_item"  tag="div" to="/top/america">北美榜</router-link>
          </div>
          <router-link class="search_entry" tag="div" to="/top/freach">
             <span>新片榜</span>
          </router-link>
        </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      </div>
      <TabBar></TabBar>
     <!-- 详情页 -->
     <!-- name="detail"与movie/index.js中detail:()=>import('@/views/movie/detail')相对应 -->
     <router-view name="detail"></router-view>
  </div>
</template>
<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
export default {
  name:'Top',
  components:{
    Header,
    TabBar,
   
  },
  mounted(){
  }
}
</script>

<style scoped>
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