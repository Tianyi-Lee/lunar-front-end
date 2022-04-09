<template>
	<router-view />
</template>

<script lang="ts" setup>
import { useUserInfoStore } from "./stores/userInfo";

//在刷新页面时保存pinia状态
window.onbeforeunload = () => {
	sessionStorage.setItem(
		"userInfo",
		JSON.stringify(JSON.stringify(useUserInfoStore().getUserInfo))
	);
};

// 页面加载回来时赋值给pinia,并删除sessionStorage内容
//???这里有问题，为什么一次parse返回的是字符串
window.onload = () => {
	const userInfoStr = sessionStorage.getItem("userInfo");
	if (userInfoStr) {
		let userInfo = JSON.parse(JSON.parse(userInfoStr));
		useUserInfoStore().setUserInfo(userInfo);
		sessionStorage.removeItem("userInfo");
	}
};

//阻止用户更改或删除已有的 sessionStorage，不影响其他任何存储， 并且该事件监听器处理函数为匿名函数无法移除
window.addEventListener("storage", (e: any) => {
	if (e.key === "token" || e.key === "userId")
		sessionStorage.setItem(e.key, e.oldValue);
});
</script>

<style>
#app {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
		"Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
/* 取消el-dialog的下边距 */
.el-dialog {
	margin-bottom: 0 !important;
}
/* 提高mavon-editor的帮助文档的z-index */
.v-note-help-wrapper {
	z-index: 6000 !important;
}

/* 用户上传投降的upload样式 */
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	text-align: center;
}
/* --end-- */
</style>
