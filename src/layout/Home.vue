<template>
  <div class="home">
    <Header />
    <div class="content">
      <Aside :items="homeItems" />
      <el-card>
        <router-view id="view" />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";

const homeItems = [
  {
    index: "/home/blogRecommend",
    iconClass: "fa fa-free-code-camp",
    title: "博客乱炖",
  },
  {
    index: "/home/service",
    iconClass: "fa fa-question-circle",
    title: "网站服务",
  },
];
</script>

<style scoped>
.home {
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
