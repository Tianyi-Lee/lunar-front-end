<template>
  <div class="notFind">
    <p>404 not find {{ errorPath }}</p>
    <el-button
      type="text"
      style="font-size: 2rem"
      @click="$router.push('/home')"
      >返回首页</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const errorPath = computed(() => {
  let errorPath = "";
  if (typeof route.params.errorPath === "string") {
    return route.params.errorPath;
  } else {
    route.params.errorPath.map((elment: string) => {
      errorPath = errorPath + "/" + elment;
    });
    return errorPath;
  }
});
</script>

<style scoped>
.notFind {
  height: 100vh;
  width: 100vw;
  font-size: 3rem;
  text-align: center;
}
</style>
