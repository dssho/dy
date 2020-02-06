<template>
  <div class="city_body">
    <!-- <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li>北京</li>
          <li>上海</li>
          <li>深圳</li>
          <li>广州</li>
          <li>西安</li>
          <li>重庆</li>
        </ul>
      </div>
      <div class="city_sort">
        <div>
          <h2>A</h2>
          <ul>
            <li>阿拉斯加斯</li>
            <li>鞍山</li>
            <li>安阳</li>
            <li>安庆</li>
          </ul>
        </div>
        <div>
          <h2>B</h2>
          <ul>
            <li>北京</li>
            <li>保定</li>
            <li>包头</li>
            <li>蚌阜</li>
          </ul>
        </div>
        <div>
          <h2>A</h2>
          <ul>
            <li>阿拉斯加斯</li>
            <li>鞍山</li>
            <li>安阳</li>
            <li>安庆</li>
          </ul>
        </div>
      </div>
      <div class="city_index">
        <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
          <li>D</li>
          <li>E</li>
        </ul>
      </div> -->
    <!-- </div> -->
 <div class="city_list">
   <Loading v-if="isLoading"></Loading>
   <!-- scroller先包上实现不了,它针对的是整体,所以在外面包一层div -->
   <Scroller v-else ref="city_List">
     <div>
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
        </ul>
      </div>
    <!-- ref="city_sort"跳转对应的城市 对应的是handToIndex方法 -->
      <div class="city_sort" ref="city_sort">
        <div v-for="item in cityList" :key="item.index">
          <h2>{{item.index}}</h2>
          <ul>
            <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}</li>
          </ul>
        </div>
      </div>
    </div>
    </Scroller>
  </div>
   <div class="city_index">
    <ul>
      <!-- (item,index)中的index是下标，用于索引的 传给handleToIndex -->
      <!-- @touchstart触摸事件 -->
     <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  name:'City',
  data(){
    return{
      cityList:[],
      hotList:[],
      // 加载失败为true
       isLoading:true
    }
  },
  mounted(){
    // 本地存储后在这儿取出来
    var cityList=window.localStorage.getItem('cityList');
    var hotList=window.localStorage.getItem('hotList');
    // 当她两同时满足时就在本地取,不用发送ajax
    if(cityList&& hotList){
      this.cityList=JSON.parse(cityList);
      this.hotList=JSON.parse(hotList);
       this.isLoading=false;
    }
    else{
      this.axios.get('api/cityList').then((res)=>{
        //  console.log(res);
        var msg=res.data.msg;
        if(msg==='ok'){
          // 数据加载成功
          this.isLoading=false;
          var cities=res.data.data.cities;

          // 最后解析为此格式
          // [{index:'A',list:[{nm:'阿成',id:123}]}]
          var {cityList,hotList}=this.formatCityList(cities);
          this.cityList=cityList;
          this.hotList=hotList;
          // 本地存储
          window.localStorage.setItem("cityList",JSON.stringify(cityList));
          window.localStorage.setItem("hotList",JSON.stringify(hotList));
        }
      });
   }
  },
  methods:{
  formatCityList(cities){
      var cityList=[];
      var hotList=[];
      // 热门城市
      for(var i=0;i<cities.length;i++){
        if(cities[i].isHot===1){
          hotList.push(cities[i]);
        }
      }
      for(var i=0;i<cities.length;i++){
        // 依据拼音中第一个字母进行放置
        var firstLetter=cities[i].py.substring(0,1).toUpperCase();
        if(toCom(firstLetter)){//新添加到index,不在结果集中(cityList中)
          cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]});
        }else{//累加到已有的index
          // 等于false 相当于已经存在了
          for(var j=0;j<cityList.length;j++){//循环已存在的
            if(cityList[j].index===firstLetter){
              //和firstLetter相同，则把这一项添加到它后边，即里边已经有A，现在又是A则把它放到原有的后边
              cityList[j].list.push({nm:cities[i].nm,id:cities[i].id});
            }
          }
        }
      }
      // 对a,b,c进行排序, 总共有22个，有4个字母不存在城市
      cityList.sort((n1,n2)=>{
        if(n1.index>n2.index){
          return 1;
        }else if(n1.index<n2.index){
          return -1;
        }else{
          return 0;
        }
      });
      // 判断第一个字母是否在结果集中
      function toCom(firstLetter){
        for(var i=0;i<cityList.length;i++){
          // 遍历判断是否和首字母相同
          // index中存放的就是A
          if(cityList[i].index===firstLetter){
            return false;
          }
        }
        return true;
      }
      // console.log(cityList);
      // console.log(hotList);
      return {
        cityList,
        hotList
      }
    },
    // 索引方法点a到a的城市
 handleToIndex(index){
  //  h2和下标
   var h2=this.$refs.city_sort.getElementsByTagName('h2');
  //  h2[index].offsetTop要找的h2的位置
  // 赋值给整个列
  //  this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;
  // 因为加了scroller下拉效果,所以索引不能用了
  // 所以要用scroll to方法 在Scroll中index.vue中封装了
  // 用过ref拿到 toScrollTop方法，在把h2[index].offsetTop作为y传进去
  this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
 },
//点击城市  
  handleToCity(nm,id){
    // 修改状态管理
    this.$store.commit('city/CITY_INFO',{nm,id});
    // 利用本地记录上次所选的记录(在store/city/index.js中state取值)
    window.localStorage.setItem('nowNm',nm);
     window.localStorage.setItem('nowId',id);
    // 跳回到
    this.$router.push('/movie/nowPlaying');
  }
}

}
</script>
<style scoped>
 .city_body{
   margin-top:96px;
   display:flex;
   width:100%;
   position:absolute;
   top:0;
   bottom:0;
 }
 .city_body .city_list{
   flex:1;
   overflow:auto;
   background:#FFF5F0;
 } 
 .city_body .city_list::-webkit-scrollbar{
   background-color:transparent;
   width:0;
 }
 .city_body .city_hot{
   margin-top:20px;
 }
 .city_body .city_hot h2{
   padding-left:15px;
   line-height:30px;
   font-size:14px;
   background:#F0F0f0;
   font-weight:normal;
 }
 .city_body .city_hot ul li{
   float:left;
   background:#fff;
   width:29%;
   height:33px;
   margin-left:3%;
   padding:0 4px;
   border:1px #e6e6e6 solid;
   border-radius:3px;
   line-height:center;
   box-sizing:border-box;
 }
 .city_body .city_sort div{
   margin-top:20px;
 }
 .city_body .city_sort h2{
   padding-left:15px;
   line-height:30px;
   font-size:14px;
   background:#F0F0f0;
   font-weight:normal;
 }
 .city_body .city_sort ul{
   padding-left:10px;
   margin-top:10px;
 }
 .city_body .city_sort ul li {
   line-height:30px;
 }
 .city_body .city_index{ 
   width:20px;
   /* height:100%; */
   /* margin-top:200px; */
    display: flex; 
    flex-direction:column; 
    justify-content:center;
     text-align: center; 
     border-left:1px #e6e6e6 solid;
  }
</style>