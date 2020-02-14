export default {
  path:'/admin',
  component:()=>import('@/views/Admin'),
  children:[
    {
      path:'users',
      component:()=> import('@/views/Admin/users.vue')
    },
    {
      path:'movie',
      component:()=> import('@/views/Admin/movie.vue')
    },
    {
      path:'top',
      component:()=> import('@/views/Admin/top.vue')
    },
    {
      path:'/admin',
      redirect:'users'
    }
  ]
}