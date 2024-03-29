<template>
	<div class="main">
		<div class="box" @keyup.enter="login(loginFormRef)">
			<el-form
				ref="loginFormRef"
				label-position="right"
				label-width="100px"
				:model="loginForm"
				size="default"
				:rules="rules"
			>
				<el-form-item class="animate__animated animate__bounce">
					<img src="../assets/images/websitelogo.svg" alt="logo" />
					<el-button type="text" @click="$router.push('/')" class="title">
						lunar</el-button
					>
				</el-form-item>
				<el-form-item label="账号:" prop="userAccount">
					<el-input
						ref="accountRef"
						:prefix-icon="User"
						v-model="loginForm.userAccount"
						placeholder="请输入账号"
					/>
				</el-form-item>
				<el-form-item label="密码:" prop="userPassword">
					<el-input
						v-model="loginForm.userPassword"
						type="password"
						placeholder="请输入密码"
						show-password
						:prefix-icon="Lock"
					/>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						style="color: white"
						@click="login(loginFormRef)"
						>登录</el-button
					>
					<el-button type="text" @click="$router.push('/register')"
						>没有账号?点击注册</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import request from "../utils/request";
import { ElNotification } from "element-plus";
import type { FormInstance } from "element-plus";
import { useUserInfoStore } from "../stores/userInfo";

const accountRef: any = ref(null);
onMounted(() => {
	accountRef.value.focus();
});
const loginFormRef = ref<FormInstance>();
const router = useRouter();

const rules = reactive({
	userAccount: [
		{
			required: true,
			message: "请输入电话号码",
			trigger: "blur",
		},
		{
			min: 11,
			max: 11,
			message: "电话号码必须为11位数字",
			trigger: "change",
		},
		{
			min: 11,
			max: 11,
			message: "电话号码必须为11位数字",
			trigger: "blur",
		},
	],
	userPassword: [
		{
			required: true,
			message: "请输入您的密码",
			trigger: "blur",
		},
	],
});

const loginForm = reactive({
	userAccount: "",
	userPassword: "",
});

function login(formEl: FormInstance | undefined) {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			request.post("/login", loginForm).then((res: any) => {
				if (res.code == "200") {
					const user = res.data.user;
					const token = res.data.token;
					sessionStorage.setItem("token", token);
					sessionStorage.setItem("userId", user.userId);

					if (user.userLimit == 1)
						ElNotification({
							title: "success",
							message: `用户 ${user.userName} 登陆成功`,
							offset: 200,
							type: "success",
						});
					else if (user.userLimit == 0)
						ElNotification({
							title: "success",
							message: `管理员 ${user.userName} 登陆成功`,
							offset: 200,
							type: "success",
						});

					router.push("/home");

					// userLimit
					//存储用户头像和昵称，用于header和个人信息之间互通
					const userInfo = {
						userName: user.userName,
						userAvatar: user.userAvatar,
						userLimit: user.userLimit,
					};
					useUserInfoStore().setUserInfo(userInfo);
				} else {
					ElNotification({
						title: "error",
						message: res.msg,
						type: "error",
					});
				}
			});
		} else {
			ElNotification({
				title: "error",
				message: "请正确填写信息",
				type: "error",
			});
			return false;
		}
	});
}
</script>

<style scoped>
.title {
	margin-left: 10%;
	font-size: 3rem;
	color: dodgerblue;
}
.main {
	height: 100vh;
	width: 100vw;
	display: grid;
	place-items: center;
}
.box {
	height: 350px;
	width: 500px;
	background-color: white;
	border-radius: 8px;
	position: relative;
	display: grid;
	place-items: center;
}
.box::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		45deg,
		hsl(300, 100%, 50%),
		hsl(200, 100%, 50%),
		hsl(100, 100%, 50%)
	);
	border-radius: 8px;
	filter: blur(28px);
	z-index: -1;
}
</style>
