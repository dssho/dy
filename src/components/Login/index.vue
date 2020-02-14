<template>
  <div class="login_body">
    <div>
      <input v-model="username" type="text" class="login_text" placeholder="用户名/手机号/Email">
    </div>
    <div>
      <input  v-model="password" type="password" class="login_text" placeholder="请输入密码">
    </div>
    <div class="login_btn">
      <input type="submit" value="登录" @touchstart="handleToLogin">
    </div>
    <div class="login_link">
      <router-link  to='/mine/register'>立即注册</router-link>
      <router-link to='/mine/finpassword'>找回密码</router-link>
    </div>
  </div>
</template>
<script>

import {messageBox} from "@/components/JS";

export default {
name:'Login',
data(){
  return{
    username:'',
    password:''
   }
 },
 methods:{
   handleToLogin(){
     this.axios.post('/v3/users/login',{
       username:this.username,
       password:this.password
     }).then((res)=>{
      //  console.log(res);
      var status=res.data.status;
      var This=this;
      if(status==0){
        messageBox({
          title:"登录",
          content:"登录成功",
          ok:"确定",
          handleOk(){
            This.$router.push('/mine/center')
          }
        });
      }else{
        messageBox({
          title:"登录",
          content:res.data.msg,
          ok:"确定"
        })
      }
     });
   }
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
.login_body .login_btn{
  height:50px;
  margin:10px;
}
.login_body .login_btn input{
  width:100%;
  height:100%;
  background:#e54847;
  border-radius:3px;
  border:none;
  display:block;
  color:#fff;
  font-size:20px;
}
.login_body .login_link{
  display:flex;
  justify-content: space-between;
}
.login_body .login_link a{
  color:#e54847;
  text-decoration:none;
  font-size:12px;
  margin:0 5px;
}
</style>