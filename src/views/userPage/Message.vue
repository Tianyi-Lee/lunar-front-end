<template>
  <div class="message">
    <el-table size="large" :show-header="false" :data="tableData">
      <el-table-column width="180px">
        <template #default="scope">
          <el-badge is-dot style="margin-right: 1vw"
            ><el-button
              type="primary"
              size="small"
              @click="handleShow(scope.row)"
              >查看</el-button
            >
          </el-badge>
          <el-button size="small" @click="handleReaded(scope.row)"
            >标为已读</el-button
          ></template
        >
      </el-table-column>
      <el-table-column prop="msg"> </el-table-column>
      <el-table-column fixed="right" width="70px">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
let tableData: any = reactive([
  {
    msg: "一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...一条新消息...",
  },
  {
    msg: "二条新消息...",
  },
  {
    msg: "三条新消息...",
  },
  {
    msg: "四条新消息...",
  },
]);
const handleReaded = (row: any) => {};

const handleDelete = (row: any) => {};

const handleShow = (row: any) => {};
</script>

<style scoped>
.message {
  font-size: 1.5rem;
}
</style>
