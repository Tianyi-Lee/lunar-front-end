<template>
  <div class="header">
    <div class="left">
      <el-button
        @click="$router.push('/')"
        type="text"
        size="large"
        style="font-size: 1.5rem"
        >Lunar博客</el-button
      >
    </div>
    <div class="center">
      <el-button
        style="border: none; font-size: larger"
        size="large"
        @click="$router.push('/home')"
        >主页</el-button
      >
      <el-button
        style="border: none; font-size: larger"
        size="large"
        @click="$router.push('/userPage')"
        >用户页面</el-button
      >
      <el-button
        style="border: none; font-size: larger"
        size="large"
        @click="$router.push('/management')"
        >管理员页面</el-button
      >
    </div>
    <div class="right">
      <el-dropdown :hide-on-click="false" trigger="hover">
        <el-button type="text" plain style="color: dodgerblue; font-size: 18px">
          <div style="margin-right: 5px">
            <el-avatar :size="30" src="">头像</el-avatar>
          </div>
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>攻击本站</el-dropdown-item>
            <el-dropdown-item @click="$router.push('/login')" divided
              >退出系统</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { ref } from "vue";

let username = ref("张三");
</script>

<style scoped>
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
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
