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
        <el-form-item>
          <img src="../assets/images/websitelogo.svg" alt="logo" />
          <el-button type="text" @click="$router.push('/')" class="title">
            lunar</el-button
          >
        </el-form-item>
        <el-form-item label="账号:" prop="userAccount">
          <el-input
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import request from "../utils/request";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";

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
          console.log(res.data);

          ElMessage({
            type: "success",
            message: "登录成功",
          });
          router.push("/");
        } else {
          ElMessage({
            type: "error",
            message: res.msg,
          });
        }
      });
    } else {
      ElMessage({
        type: "error",
        message: "请填写正确的信息",
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
