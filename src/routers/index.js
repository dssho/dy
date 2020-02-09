import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './top'
import mineRouter from './mine'

Vue.use(VueRouter)

const routes = [
   movieRouter,
    cinemaRouter,
    mineRouter,
  {
	path:'/*',
	redirect:'/movie'
    }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router
