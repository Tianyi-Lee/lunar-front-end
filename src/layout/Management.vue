<template>
  <div class="management">
    <Header />
    <div class="content">
      <Aside :items="managementItems" />
      <el-card>
        <router-view id="view" />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";

const managementItems = [
  {
    index: "/management/logStatistics",
    iconClass: "",
    title: "日志统计",
  },
  {
    index: "/management/infoManage",
    iconClass: "",
    title: "信息管理",
  },
  {
    index: "/management/userManage",
    iconClass: "",
    title: "用户管理",
  },
];
</script>

<style scoped>
.management {
  font-size: 1rem;
  height: 100vh;
  width: 100vw;
}

.content {
  display: flex;
  height: calc(100vh - 8vh);
  width: 100vw;
}

#view {
  width: calc(100vw - 180px - 30px);
  height: calc(100vh - 8vh);
  padding: 1vh;
}
</style>
