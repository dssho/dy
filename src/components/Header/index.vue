<template>
    <header id="header">
        <slot></slot>
        <h1>{{title}}</h1>
    </header>
</template>
<script>
export default {
    // 添加name方便调试代码
    name:'Header',
    props:{
        title:{
            type:String,
            default:''
        }
    }
}
</script>
<style scoped>
   #header{
       width:100%;
       height:50px;
       color:#fff;
       background:#e54847;
       border-bottom:1px solid #e54847;
       position:relative;
   }
   #header h1{
       font-size:18px;
       text-align:center;
       line-height:50px;
       font-weight:normal;
   }
</style>
