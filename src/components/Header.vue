<template>
	<div class="header">
		<div class="left">
			<el-button
				@click="$router.push('/')"
				type="text"
				size="large"
				style="font-size: 2rem"
				class="animate__animated animate__rubberBand"
				>Lunar</el-button
			>
		</div>
		<div class="center">
			<el-button style="border: none; font-size: larger" size="large" @click="goHome"
				><i class="fa fa-home" aria-hidden="true"></i>home
			</el-button>
			<el-divider direction="vertical" />
			<el-button style="border: none; font-size: larger" size="large" @click="goUser"
				><i class="fa fa-user" aria-hidden="true"></i>user</el-button
			>
			<el-divider v-if="userLimit === 0" direction="vertical" />
			<el-button v-if="userLimit === 0" style="border: none; font-size: larger" size="large" @click="goManager"
				><i class="fa fa-tachometer" aria-hidden="true"></i>manager
			</el-button>
			<div style="width: 100%; display: flex; justify-content: center">
				<el-input v-model="searchContent" style="width: 40%" placeholder="输入关键词搜索" :prefix-icon="Search" />
				<el-button style="margin: 0 0 0 2vw" type="primary" :icon="Search" @click="search" />
			</div>
		</div>
		<div class="right">
			<el-dropdown :hide-on-click="false" trigger="hover">
				<el-button type="text" style="font-size: 1.25rem">
					<div style="margin-right: 1vw">
						<el-avatar :size="30" :src="userAvatar"></el-avatar>
					</div>
					<span style="display: inline-block">{{ userName }}</span>
				</el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item disabled><i class="fa fa-bomb" aria-hidden="true"></i>攻击本站</el-dropdown-item>
						<el-dropdown-item @click="exit" divided
							><i class="fa fa-sign-out" aria-hidden="true"></i>退出系统</el-dropdown-item
						>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { Search } from "@element-plus/icons-vue";
	import { ElMessage } from "element-plus";
	import { storeToRefs } from "pinia";
	import { ref } from "vue";
	import router from "../router";
	import { useUserInfoStore } from "../stores/userInfo";
	import { handleElButtonBlur } from "../utils/handleButton";
	import request from "../utils/request";
	let searchContent = ref("");
	const userInfoStore = useUserInfoStore();
	const { userLimit, userName, userAvatar } = storeToRefs(userInfoStore);

	const exit = () => {
		request.post("/logout").then((res: any) => {
			if (res.code == "200") {
				sessionStorage.clear();
				ElMessage({ type: "success", message: "退出成功" });
				router.push("/");
			}
		});
	};

	const search = (e: any) => {
		handleElButtonBlur(e);
	};
	function goHome(e: any) {
		handleElButtonBlur(e);
		router.push("/home");
	}
	function goUser(e: any) {
		handleElButtonBlur(e);
		router.push("/userPage");
	}
	function goManager(e: any) {
		handleElButtonBlur(e);
		router.push("/management");
	}
</script>

<style scoped>
	i {
		margin-right: 5px;
	}
	.header {
		height: 8vh;
		width: 100vw;
		line-height: 8vh;
		display: flex;
		border: 1px solid var(--el-border-color-base);
		border-radius: 5px;
	}

	.left {
		width: 180px;
		font-weight: bold;
		color: hsl(210, 100%, 56%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.center {
		flex: 1;
		padding-left: 2vw;
		display: flex;
		align-items: center;
	}

	.right {
		width: 10vw;
		text-align: center;
		padding-right: 3%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
