<template>
  <div class="userPage">
    <Header />
    <div class="content">
      <Aside :items="userPageItems" />
      <el-card>
        <router-view id="view" />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";

//定义userPage页面的Aside
const userPageItems = [
  {
    index: "/userPage/profile",
    iconClass: "fa fa-commenting-o",
    title: "个人信息",
  },
  {
    index: "/userPage/blog",
    iconClass: "",
    title: "我的博客",
  },
  {
    index: "/userPage/friend",
    iconClass: "fa fa-user-plus",
    title: "我的好友",
  },
  {
    index: "/userPage/favorites",
    iconClass: "",
    title: "我的收藏",
  },
  {
    index: "/userPage/message",
    iconClass: "",
    title: "我的消息",
  },
];
</script>

<style scoped>
.userPage {
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
