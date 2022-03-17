<template>
  <el-card class="aside">
    <el-menu
      :default-active="currentPath"
      router
      class="el-menu-vertical-demo mymenu"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item v-for="item in items" :index="item.index">
        <i :class="item.iconClass" aria-hidden="true"></i>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType } from "vue";
import { useRoute } from "vue-router";

//实现侧边栏的两个回调函数
function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath);
}

function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath);
}

//currentPath和当前的路径绑定
const route = useRoute();
let currentPath = ref(route.path);

//声明Aside的props以实现Aside项目动态更改
interface menuItem {
  index: string;
  iconClass: string;
  title: string;
}
defineProps({
  items: { type: Array as PropType<menuItem[]>, required: true },
});
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
