<template>
  <div class="main">
    <div class="box" @keyup.enter="register(registerFormRef)">
      <el-form
        ref="registerFormRef"
        label-position="right"
        label-width="100px"
        :model="registerForm"
        size="default"
        :rules="rules"
      >
        <el-form-item>
          <img src="../assets/images/websitelogo.svg" alt="logo" />
          <el-button @click="$router.push('/home')" type="text" class="title">
            lunar
          </el-button>
        </el-form-item>
        <el-form-item label="手机号:" prop="userAccount">
          <el-input
            v-model="registerForm.userAccount"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="昵称:" prop="userName">
          <el-input
            v-model="registerForm.userName"
            placeholder="请输入您喜欢的昵称"
          />
        </el-form-item>
        <el-form-item label="密码:" prop="userPassword">
          <el-input
            v-model="registerForm.userPassword"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirm">
          <el-input
            v-model="registerForm.confirm"
            type="password"
            placeholder="再次输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="color: white"
            @click="register(registerFormRef)"
            >注册</el-button
          >
          <el-button type="text" @click="$router.push('/login')"
            >已有账号,立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import request from "../utils/request";
import FDate from "../utils/FormatedDate";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const registerFormRef = ref<FormInstance>();
const router = useRouter();

const registerForm: any = reactive({
  userAccount: "",
  userName: "",
  userPassword: "",
  userRegisterTime: "",
  confirm: "",
});

function confirmPassword(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerForm.userPassword) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
    console.log("是这里吗");
  }
}

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
  userName: [
    {
      required: true,
      message: "请输入昵称",
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
  confirm: [
    {
      required: true,
      validator: confirmPassword,
      trigger: "blur",
    },
  ],
});

function register(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      registerForm.userRegisterTime = new FDate().format("yyyy-MM-dd hh:mm:ss");
      delete registerForm.confirm;
      request.post("/register", registerForm).then((res: any) => {
        if (res.code === 200) {
          ElMessage({
            type: "success",
            message: "注册成功",
          });
          router.push("/login");
        } else if (res.code === "-1") {
          ElMessage({
            type: "error",
            message: res.msg,
          });
          router.push("/login");
        } else
          ElMessage({
            type: "error",
            message: res.msg,
          });
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
  max-width: 100%;
  display: grid;
  background: linear-gradient(
    135deg,
    hsl(170, 80%, 70%),
    hsl(190, 80%, 70%),
    hsl(250, 80%, 70%),
    hsl(290, 80%, 70%)
  );
  place-items: center;
  background-size: 200% 200%;
  animation: gradient-move 20s ease alternate infinite;
}

@keyframes gradient-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
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
</style>
