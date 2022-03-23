<template>
  <div class="service">
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" accordion @change="handleChange">
        <el-collapse-item name="1">
          <template #title>
            <span style="font-size: 1.5rem">向我们反馈</span>
          </template>
          <p>
            如果您在使用本博客过程中遇到任何问题，请第一时间联系我们，帮助我们及时修复，感谢您的反馈
          </p>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <span style="font-size: 1.5rem">联系我们</span>
          </template>
          <p>
            电话: <strong>110</strong> <br />
            邮箱: <strong>110@gmail.com</strong>
          </p>
        </el-collapse-item>

        <el-collapse-item name="3">
          <template #title>
            <span style="font-size: 1.5rem">加入我们</span>
          </template>
          <p>
            如果您有意向帮助我们一起管理本站，请联系我们申请管理员账号，期待您的加入
          </p>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template #title>
            <span style="font-size: 1.5rem">FAQ</span>
          </template>
          <ul>
            <li>
              <p style="font-size: 1.25rem; font-weight: 600">
                #我们的网站可靠吗？
              </p>
              <p>用户个人信息都加密存储在数据库，保证安全</p>
            </li>
            <li style="margin-top: 3vh">
              <p style="font-size: 1.25rem; font-weight: 600">
                #无法正常登录？
              </p>
              <p>您的账号可能涉嫌违法操作！请联系管理员解封</p>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeNames = ref(["1"]);
const handleChange = (val: string[]) => {
  activeNames.value = val;
};
</script>

<style scoped>
.service {
  font-size: 1.5rem;
}
p {
  font-size: 1rem;
}
</style>
