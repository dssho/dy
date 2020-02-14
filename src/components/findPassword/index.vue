<template>
  <div class="password_body">
    <div class="password_email">
      邮箱: <input v-model="email" class="password_text" type="text">  <button  :disable="disable" @touchstart="handleToVerify">{{verifyInfo}}</button>
    </div>
    <div>
      新密码:  <input v-model="password"  class="password_text" type="password">
    </div>
    <div>
      验证码： <input v-model="verify" class="password_text" type="text">
    </div>
    <div class="password_btn">
      <button  @touchstart="handleToPassword">修改</button>
    </div>
    <div class="password_link">
      <router-link  to='/mine/login'>立即登录</router-link>
      <router-link to='/mine/registe'>立即注册</router-link>
    </div>
  </div>
</template>
<script>
import { messageBox} from '@/components/JS';
export default {
  name:'findPassword',
  data(){
    return{
      email:'',
      password:'',
      verify:'',
      verifyInfo:'发送验证码',
      disable:false
    }
  },
  methods:{
     handleToVerify(){
        this.axios.get('/v3/users/verify?email='+this.email).then((res)=>{
        var status=res.data.status;
        var This=this;
        if(status==0){
          messageBox({
            title:'验证码',
            content:'验证码已发送',
            ok:'确定',
             handleOk(){
              This.countDown();
            }
          });
        }else{
          messageBox({
            title:'验证码',
            content:'验证码发送失败',
            ok:'确定'
          });
        }
      });
     },
     handleToPassword(){
       this.axios.post('/v3/users/findPassword',{
         email:this.email,
         password:this.password,
         verify:this.verify
       }).then((res)=>{
         var status=res.data.status;
         var This=this;
         if(status==0){
            messageBox({
              title:'密码',
              content:'修改密码成功',
              ok:'确定',
              handleOk(){
                This.$router.push('/mine/login');
              }
          });
         }else{
           messageBox({
            title:'密码',
            content:'修改密码失败',
            ok:'确定'
          });
         }
       });
     },
      countDown(){
          this.disable=true;
          var count=60;
          var timer=setInterval(()=>{
            count--;
            this.verifyInfo='剩余'+count+'秒';
            if(count===0){
              this.disable=false;
              count=60;
              this.verifyInfo="发送验证码";
             clearInterval(timer._id);
            }
          },2000);
        }
  }
}
</script>
<style scoped>
  .password_body{
  width:100%;
}
.password_body .password_email{
  position: relative;
}
.password_body .password_email button{
  position:absolute;
  right:10px;
  top:10px;
  height:30px;
   border-radius:3px;
  border:none;
  padding:5px;
}
.password_body .password_text{
  width:100%;
  height:40px;
  border:none;
  border-bottom:1px solid #ccc;
  margin-bottom:5px;
  outline:none;
  /* 用来设置文本中第一行缩进 */
  text-indent:10px;
}
.password_body .password_btn{
  height:50px;
  margin:10px;
}
.password_body .password_btn input{
  width:100%;
  height:100%;
  background:#e54847;
  border-radius:3px;
  border:none;
  display:block;
  color:#fff;
  font-size:20px;
}
.password_body .password_link{
  display:flex;
  justify-content: space-between;
}
.password_body .password_link a{
  color:#e54847;
  text-decoration:none;
  font-size:12px;
  margin:0 5px;
}
</style>