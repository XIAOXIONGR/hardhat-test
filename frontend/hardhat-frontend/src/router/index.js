// index.js

// 引入需要的模块
import { createRouter, createWebHistory } from "vue-router";
// import Index from '@/index.html';
const routes = [
  {
    path: "/",
    redirect: "/GameHome",
  },

  {
    path: "/home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/GameHome",
    component: () => import("../views/GameHome.vue"),
  },
  {
    path: "/HomeView",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/swiper",
    component: () => import("../views/swiper.vue"),
  },
  {
    path: "/swiper2",
    component: () => import("../views/swiper2.vue"),
  },
//   {
//     path: "/detail/:n",
//     name: "DetailsPage",
//     component: () => import("../views/DetailPage.vue"),
//     props: true, // 将路由参数作为组件的 props 传递
//   },
 
];

// 创建路由
const router = createRouter({
  history: createWebHistory("/frontend/"),
  routes,
});

// 导出路由
export default router;
