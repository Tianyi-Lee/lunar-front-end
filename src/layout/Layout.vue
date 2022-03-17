<template>
  <div class="layout">
    <Header />
    <div class="content">
      <Aside />
      <el-card>
        <router-view id="view" />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";
</script>

<style scoped>
.layout {
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
