import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './top'
import mineRouter from './mine'
import adminRouter from './admin'

Vue.use(VueRouter)

const routes = [
   movieRouter,
    cinemaRouter,
    mineRouter,
    adminRouter,
  {
	path:'/*',
	redirect:'/movie'
    }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: 'dy',
})

export default router
