export default {
    path:'/top',
    component:()=>import('@/views/Top'),
    children:[
        {
          path:'week',
          component:()=>import('@/components/Week')
        },
        {
            path:'america',
            component:()=>import('@/components/America')
        },
        {
            path:'freach',
            component:()=>import('@/components/Freach')
        },
        {   
            // 百度搜索vue router中命名视图的格式
            path:'detail/1/:movieId',
            components:{
                // 指向没有名字的组件，所以和detail中的第二个router-view就区分开了
                default:()=>import('@/components/Week'),
                detail:()=>import('@/views/Movie/detail')
            },
            // 多个显示区域,所以用对象
            props:{
                detail:true
            }
        },
        {   
            // 百度搜索vue router中命名视图的格式
            path:'detail/2/:movieId',
            components:{
                // 指向没有名字的组件，所以和detail中的第二个router-view就区分开了
                default:()=>import('@/components/America'),
                detail:()=>import('@/views/Movie/detail')
            },
            // 多个显示区域,所以用对象
            props:{
                detail:true
            }
        },
        {
            path:'/top',
            redirect:'/top/week'
        }
    ]
}
