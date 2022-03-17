import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "网站首页",
    component: () => import("../layout/HomeOfWebsite.vue"),
    meta: {
      title: "Lunar",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../layout/Login.vue"),
    meta: {
      title: "Lunar-登录",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../layout/Register.vue"),
    meta: {
      title: "Lunar-注册",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../layout/Home.vue"),
    redirect: "/home/blogRecommend",
    children: [
      {
        path: "blogRecommend",
        name: "BlogRecommend",
        component: () => import("../views/home/BlogRecommend.vue"),
        meta: {
          title: "Lunar-博客乱炖",
        },
      },
      {
        path: "service",
        name: "Service",
        component: () => import("../views/home/Service.vue"),
        meta: {
          title: "Lunar-服务",
        },
      },
    ],
  },
  {
    path: "/userPage",
    name: "userPage",
    component: () => import("../layout/UserPage.vue"),
    redirect: "/userPage/profile",
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("../views/userPage/Profile.vue"),
        meta: {
          title: "Lunar-个人信息",
        },
      },
      {
        path: "blog",
        name: "Blog",
        component: () => import("../views/userPage/Blog.vue"),
        meta: {
          title: "Lunar-我的博客",
        },
      },
      {
        path: "friend",
        name: "Friend",
        component: () => import("../views/userPage/Friend.vue"),
        meta: {
          title: "Lunar-我的好友",
        },
      },
      {
        path: "favorites",
        name: "Favorites",
        component: () => import("../views/userPage/Favorites.vue"),
        meta: {
          title: "Lunar-我的收藏",
        },
      },
      {
        path: "message",
        name: "Message",
        component: () => import("../views/userPage/Message.vue"),
        meta: {
          title: "Lunar-我的消息",
        },
      },
    ],
  },
  {
    path: "/management",
    name: "Management",
    component: () => import("../layout/Management.vue"),
    redirect: "/management/logStatistics",
    children: [
      {
        path: "logStatistics",
        name: "LogStatistics",
        component: () => import("../views/management/LogStatistics.vue"),
        meta: {
          title: "Lunar-日志统计",
        },
      },
      {
        path: "infoManage",
        name: "InfoManage",
        component: () => import("../views/management/InfoManage.vue"),
        meta: {
          title: "Lunar-信息管理",
        },
      },
      {
        path: "userManage",
        name: "UserManage",
        component: () => import("../views/management/UserManage.vue"),
        meta: {
          title: "Lunar-用户管理",
        },
      },
    ],
  },
  {
    path: "/:errorPath(.*)*",
    name: "404",
    component: () => import("../layout/404.vue"),
    meta: {
      title: "404",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (typeof to.meta.title === "string") document.title = to.meta.title;
});

export default router;
