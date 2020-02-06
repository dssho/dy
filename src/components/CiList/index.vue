<template>
  <div class="cinema_body">
    <Loading v-if="isLoading"></Loading>
    <Scroller v-else>
    <ul>
      <!-- <li>
        <div>
          <span>恒大影院</span>
          <span class="q"><span class="price">25.9</span>元起</span>
        </div>
        <div class="address">
          <span>北京市海淀区</span>
          <span>10km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>恒大影院</span>
          <span class="q"><span class="price">25.9</span>元起</span>
        </div>
        <div class="address">
          <span>北京市海淀区</span>
          <span>10km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>恒大影院</span>
          <span class="q"><span class="price">25.9</span>元起</span>
        </div>
        <div class="address">
          <span>北京市海淀区</span>
          <span>10km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>恒大影院</span>
          <span class="q"><span class="price">25.9</span>元起</span>
        </div>
        <div class="address">
          <span>北京市海淀区</span>
          <span>10km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>恒大影院</span>
          <span class="q"><span class="price">25.9</span>元起</span>
        </div>
        <div class="address">
          <span>北京市海淀区</span>
          <span>10km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>恒大影院</span>
          <span class="q"><span class="price">25.9</span>元起</span>
        </div>
        <div class="address">
          <span>北京市海淀区</span>
          <span>10km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>恒大影院</span>
          <span class="q"><span class="price">25.9</span>元起</span>
        </div>
        <div class="address">
          <span>北京市海淀区</span>
          <span>10km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li> -->
       <li v-for="item in cinemaList" :key="item.id">
        <div>
          <span>{{item.nm}}</span>
          <span class="q"><span class="price">{{item.price}}</span>元起</span>
        </div>
        <div class="address">
          <span>{{item.addr}}</span>
          <span>{{item.distance}}</span>
        </div>
        <div class="card">
          <!-- <div>小吃</div>
          <div>折扣卡</div> -->
          <!-- num为tag中的值 -->
          <!-- key为tag中的各个名称 -->
          <div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class="key|classCard">{{key 
            | formatCard}}</div>
        </div>
      </li> 
    </ul>
    </Scroller>
  </div>
</template>
<script>
export default {
  name:'CiList',
  data(){
    return{
      cinemaList:[],
       // 加载失败为true
     isLoading:true,
     prevCityId:-1
    }
  },
   activated(){
    var cityId=this.$store.state.city.id;
        // 如果她两相等说明就不用切换城市
        if( this.prevCityId===cityId){
            return;
        }
         this.isLoading=true;
    this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
      var msg=res.data.msg;
      if(msg==='ok'){
        this.cinemaList=res.data.data.cinemas;
         // 数据加载成功
         this.isLoading=false;
         // 对 prevCityId进行赋值
        this.prevCityId=cityId;
      }
    });
  },
  filters:{
    formatCard(key){
      var card=[
        {key:'allowRefund',value:'改签'},
        {key:'endorse',value:'退'},
        {key:'sell',value:'折扣卡'},
        {key:'snack',value:'小吃'}
      ];
      for(var i=0;i<card.length;i++){
        if(card[i].key===key){
          return card[i].key;
        }
      }
       return '';
    },
    classCard(key){
      var card=[
        {key:'allowRefund',value:'bl'},
        {key:'endorse',value:'bl'},
        {key:'sell',value:'or'},
        {key:'snack',value:'or'}
      ];
      for(var i=0;i<card.length;i++){
        if(card[i].key===key){
          return card[i].key;
        }
      }
       return '';
    }
  }
}
</script>
<style scoped>
.cinema_body{
  flex:1;
  overflow:auto;
}
.cinema_body ul{
  padding:20px;
}
.cinema_body ul li{
  border-bottom:1px solid #e6e6e6;
  margin-bottom:20px;
}
.cinema_body div{
  margin-bottom:10px;
}
.cinema_body .q{
  font-size:11px;
  color:#f03d37;
}
.cinema_body .price{
  font-size:18px;
}
.cinema_body .address{
  font-size:13px;
  color:#666;
}
.cinema_body .address span:nth-of-type(2){
  float:right;
}
.cinema_body .card{
  display:flex;
}
.cinema_body .card div{
 width:45px;
  padding:0 3px;
  height:15px;
  color:#f90;
  border:1px solid #f90;
  font-size:13px;
 margin-right:5px;
  border-radius:2px;
  text-align:center;
}
/*  */
.cinema_body .card div.or{
   color: #f90;
    border: 1px solid #f90;
   }
.cinema_body .card div.bl{
   color: #589daf;
    border: 1px solid #589daf;
   }
</style>