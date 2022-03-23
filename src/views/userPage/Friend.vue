<template>
  <div class="friend">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="我的关注" name="first">小孩</el-tab-pane>
      <el-tab-pane label="我的粉丝" name="third">小明</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeName = ref("first");

const handleClick = (tab: string, event: Event) => {
  console.log(tab, event);
};
</script>

<style scoped>
.friend {
  font-size: 1.5rem;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
