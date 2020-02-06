<template>
  <div class="wrapper" ref="wrapper">
    <!-- 利用插槽,配置成全局的组件 -->
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name:'Scroller',
  props:{
    handleToScroll:{
      type:Function,
      default:function(){}
    },
    handleToTouchEnd:{
       type:Function,
      default:function(){}
    }
  },
  mounted(){
      var scroll=new BScroll(this.$refs.wrapper,{
          //   如果想要handleToDetail能点击跳转，必须先开启tap
            tap:true,
          //   scroll配置 查better-scroll api即有
          // 滚动的时候会派发scroll事件,会节流
          probeType:1
        });
         
        //  为toScrollTop添加属性
        this.scroll=scroll;

        scroll.on('scroll',(pos)=>{
         this.handleToScroll(pos);
        });
        scroll.on('touchEnd',(pos)=>{
         this.handleToTouchEnd(pos);
        });
  },
 methods:{
  toScrollTop(y){
    this.scroll.scrollTo(0,y);
  }
 }
}
</script>
<style scoped>
 .wrapper{
   height:100%;
 }
</style>