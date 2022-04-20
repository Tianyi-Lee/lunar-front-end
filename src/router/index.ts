import { ElMessage } from "element-plus";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserInfoStore } from "../stores/userInfo";

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
				path: "blog/:blogId(\\d+)",
				component: () => import("../components/showBlog.vue"),
				meta: {
					title: "Lunar-博客乱炖",
				},
			},
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
				path: "blog/:blogId(\\d+)",
				component: () => import("../components/showBlog.vue"),
				meta: {
					title: "Lunar-我的博客",
				},
			},
			{
				path: "profile",
				name: "Profile",
				component: () => import("../views/userPage/Profile.vue"),
				meta: {
					title: "Lunar-个人信息",
				},
			},
			{
				path: "myBlog",
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
		redirect: "/management/userManage",
		children: [
			{
				path: "userManage",
				name: "UserManage",
				component: () => import("../views/management/UserManage.vue"),
				meta: {
					title: "Lunar-用户管理",
				},
			},
			{
				path: "blogManage",
				name: "BlogManage",
				component: () => import("../views/management/BlogManage.vue"),
				meta: {
					title: "Lunar-博客管理",
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

router.beforeEach((to, from, next) => {
	if (to.path === "/" || to.path === "/login" || to.path === "/register" || sessionStorage.getItem("token")) {
		next();
	} else {
		ElMessage({
			type: "error",
			message: "请先登录",
		});
		next({
			path: "/login",
		});
	}
	if (typeof to.meta.title === "string") document.title = to.meta.title;
});
let userInfoStore: any = null;
router.beforeResolve((to, from, next) => {
	if (userInfoStore === null) {
		userInfoStore = useUserInfoStore();
	}
	const userLimit = userInfoStore.getUserInfo.userLimit;
	if ((to.path === "/management/blogManage" || to.path === "/management/userManage") && userLimit !== 0)
		next({
			path: "/404",
		});
	else next();
});
export default router;
