<template>
  <div>
    <el-button type="primary" @click="newBlog">开始创作</el-button>
    <el-dialog
      :show-close="false"
      top="3vh"
      v-model="dialogVisible"
      center
      width="80%"
      :append-to-body="true"
    >
      <template #title>
        <p style="font-size: 2rem; font-weight: 500; color: dodgerblue">
          博客创作
        </p>
      </template>
      <div style="height: 77vh; overflow: auto">
        <el-scrollbar style="padding-right: 1%">
          <el-form label-width="80px">
            <el-form-item required label="标题">
              <el-input placeholder="请输入文章标题" />
            </el-form-item>
            <el-form-item required label="摘要">
              <el-input placeholder="请输入文章摘要" />
            </el-form-item>
            <el-form-item required label="可见性">
              <el-switch
                active-value="私有"
                nactive-value="公开"
                v-model="form"
                inactive-color="#13ce66"
                inline-prompt
                size="large"
                :width="55"
                active-text="私有"
                inactive-text="公开"
                style="margin-right: 2vw"
              />
              <p style="color: dodgerblue" v-if="form === '私有'">
                仅自己可见，对其他人隐藏!!!
              </p>
              <p style="color: #13ce66" v-else="form === '公开'">
                所有人可见，对其他人可见...
              </p>
            </el-form-item>
            <el-form-item required label="类型">
              <el-radio-group v-model="type">
                <el-radio border label="原创">原创</el-radio>
                <el-radio border label="转载">转载</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="正文">
              <Editor
                @save="save"
                v-model="content"
                :toolbars="toolbars"
                codeStyle="monokai"
                fontSize="18px"
                :html="false"
                style="height: 100%; width: 100%; min-height: 74vh"
              />
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const toolbars = {
  header: true, // 标题
  bold: true, // 粗体
  italic: true, // 斜体
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: true, // 全屏编辑
  readmodel: true, // 沉浸式阅读
  htmlcode: true, // 展示html源码
  help: true, // 帮助
  /* 1.3.5 */
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  save: true, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: true, // 导航目录
  /* 2.1.8 */
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  /* 2.2.1 */
  subfield: true, // 单双栏模式
  preview: true, // 预览
};

const dialogVisible = ref(false);
const type = ref("原创");
const form = ref("公开");
const content = ref("");
const newBlog = () => {
  dialogVisible.value = true;
};
const save = () => {
  console.log(content.value);
};
</script>

<style>
.v-note-help-wrapper {
  z-index: 6000 !important;
}
</style>
