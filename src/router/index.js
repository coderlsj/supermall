import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home/Home');
const Category = () => import('../views/category/Category');
const Shopcar = () => import('../views/shopcar/Shopcar');
const Profile = () => import('../views/profile/Profile');
const Detail = () => import('../views/detail/Detail');


// 1.使用插件
Vue.use(VueRouter)

//2.创建VueRouter对象

const routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/shopcar',
    component: Shopcar,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router