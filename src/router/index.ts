import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../layout/Layout.vue"),
    redirect: "/profile",
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("../views/Profile.vue"),
        meta: {
          title: "lunar-个人信息",
        },
      },
      {
        path: "usermanage",
        name: "UserManage",
        component: () => import("../views/UserManage.vue"),
        meta: {
          title: "lunar-用户管理",
        },
      },
      {
        path: "friend",
        name: "Friend",
        component: () => import("../views/Friend.vue"),
        meta: {
          title: "lunar-好友页",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../layout/Login.vue"),
    meta: {
      title: "lunar-登录",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../layout/Home.vue"),
    meta: {
      title: "lunar-主页",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../layout/Register.vue"),
    meta: {
      title: "lunar-注册",
    },
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
