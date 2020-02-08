export default {
    path:'/movie',
    component:()=>import('@/views/Movie'),
    children:[
        {
          path:'discuss',
          component:()=>import('@/components/Discuss')
        },
        {
            path:'nowPlaying',
            component:()=>import('@/components/NowPlaying')
        },
        {
            path:'comingSoon',
            component:()=>import('@/components/ComingSoon')
        },
        {
            path:'works',
            component:()=>import('@/components/Works')
        },
        {   
            // 百度搜索vue router中命名视图的格式
            path:'detail/1/:movieId',
            components:{
                // 指向没有名字的组件，所以和detail中的第二个router-view就区分开了
                default:()=>import('@/components/NowPlaying'),
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
                default:()=>import('@/components/ComingSoon'),
                detail:()=>import('@/views/Movie/detail')
            },
            // 多个显示区域,所以用对象
            props:{
                detail:true
            }
        },
        {
            path:'/movie',
            redirect:'/movie/nowPlaying'
        }
    ]
}
