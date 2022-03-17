<template>
  <el-card class="aside">
    <el-menu
      :default-active="currentPath"
      router
      class="el-menu-vertical-demo mymenu"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/profile">
        <i class="fa fa-user" aria-hidden="true"></i>
        <template #title>个人信息</template>
      </el-menu-item>

      <el-menu-item index="/friend">
        <i class="fa fa-user-plus" aria-hidden="true"></i>
        <template #title>我的好友</template>
      </el-menu-item>

      <el-menu-item index="/usermanage">
        <i class="fa fa-commenting-o" aria-hidden="true"></i>
        <template #title>用户管理</template>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
let currentPath = ref(route.path);

function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath);
}

function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath);
}
</script>

<style scoped>
.aside {
  height: calc(100vh - 1px - 8vh);
  width: 180px;
}

.mymenu {
  border: 0;
  height: calc(100vh - 1px - 8vh);
}

i {
  width: 5vw;
  font-size: 1.5rem;
}
</style>
