<template>
  <div class="profile">
    <p>个人信息页</p>
    {{ age }}岁
    <el-button @click="info.birthday(10)">十年--过生日</el-button>
    <p>{{ gothrough8 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useInfoStore } from "../../stores/info";
import { storeToRefs } from "pinia";

const info = useInfoStore();
const { age, gothrough8 } = storeToRefs(info);
</script>

<style scoped>
.profile {
  font-size: 1.5rem;
}
</style>
