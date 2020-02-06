// 做定位框,
import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox=(function(){
  var defaults={//默认值
    title:'',  // 对应MessageBox/index.vue中h2
    content:'', // 对应MessageBox/index.vue中p
    cancel:'',  // 对应MessageBox/index.vue中取消
    ok:'',     // 对应MessageBox/index.vue中切换定位
    handleCancel:null,
    handleOk:null
  };

  // 通过Vue.extend能得到里边的东西,并且返回一个新类就和组件结合到一起
  var Mycomponent=Vue.extend(MessageBox);
  return function(opts){  //配置参数
    for(var attr in opts){
      defaults[attr]=opts[attr];
    }
    
    var vm=new Mycomponent({
       el:document.createElement('div'),
       data:{
         title:defaults.title,
         content:defaults.content,
         cancel:defaults.cancel,
         ok:defaults.ok
       },
       methods:{
        handleCancel(){
          console.log(defaults.handleCancel);
          // defaults.handleCancel 如果不存在不用管,如果存在就执行后边
          // .bind(this)通过call拿到vm对象
          defaults.handleCancel&&defaults.handleCancel.call(this);
          // 点击后删除按钮
          document.body.removeChild(vm.$el);
        },
        handleOk(){
          // defaults.handleCancel 如果不存在不用管,如果存在就执行后边
          // .bind(this)通过call拿到vm对象
          defaults.handleOk&&defaults.handleOk.call(this);
          document.body.removeChild(vm.$el);
        }
       }
    });
    // 把它添加到body中
    document.body.appendChild(vm.$el);
  };
})();