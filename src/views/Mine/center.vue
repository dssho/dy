<template>
 <div  class="login_body">
    <div   class="login_text">个人中心</div>
   <div  class="login_text">当前用户:{{$store.state.user.name}}<a href="javascript:;" @touchstart="handleToLogout">退出</a></div>
   <div  class="login_text" v-if="$store.state.user.isAdmin">用户身份:  管理员 <a href="/admin" target="_blank">进入管理后台</a></div>
   <div  class="login_text" v-else>用户身份: 普通会员</div>
 </div>
</template>
<script>
import axios from 'axios';
export default {
  name:'center',
  methods:{
    // 退出时
    handleToLogout(){
      this.axios.get('/v3/users/logout').then((res)=>{
        var status=res.data.status;
        if(status===0){
          // 退出时要全部清空
          localStorage.removeItem('name');
          localStorage.removeItem('isAdmin');
          this.$store.commit('user/USER_NAME',{name:'',isAdmin:false});
          this.$router.push('/mine/login');
        }
      });
    }
  },
  // 添加守卫,即未登录时显示的登录页,而不是个人中心页
  beforeRouteEnter(to,from,next){
    axios.get('/v3/users/getUser').then((res)=>{
      var status=res.data.status;
      if(status==0){
        next(vm=>{
          // 本地存储,在跳转后台时,数据还可得到
          localStorage.setItem('name',res.data.data.username);
          localStorage.setItem('isAdmin',res.data.data.isAdmin);

          vm.$store.commit('user/USER_NAME',{name:res.data.data.username,isAdmin:res.data.data.isAdmin});
        });
      }else{
        next('/mine/login');
      }
    });
    
  }

}
</script>
<style scoped>
  .login_body{
  width:100%;
}
.login_body .login_text{
  width:100%;
  height:40px;
  border:none;
  border-bottom:1px solid #ccc;
  margin-bottom:5px;
  outline:none;
  /* 用来设置文本中第一行缩进 */
  text-indent:10px;
}
</style>