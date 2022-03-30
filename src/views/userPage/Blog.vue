<template>
  <div class="blog">
    <p>博客页面</p>
    <el-button @click="newBlog">开始创作</el-button>
    <el-dialog
      top="5vh"
      v-model="dialogVisible"
      title="博客创作"
      center
      width="80%"
    >
      <div style="height: 70vh; overflow: auto">
        <el-scrollbar>
          <Editor style="height: 70vh; width: 99%"></Editor>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// import Editor from "../../components/Editor.vue";
import { ref } from "vue";

const dialogVisible = ref(false);
const newBlog = () => {
  dialogVisible.value = true;
};
</script>

<style scoped>
.blog {
  font-size: 1.5rem;
}
</style>
