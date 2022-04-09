<template>
	<el-scrollbar>
		<el-button
			:icon="ArrowLeftBold"
			type="text"
			style="font-size: 20px"
			@click="$router.back()"
			><span>返回</span></el-button
		>
		<p>{{ currentBlog.currentBlogId }}</p>
		<Editor
			v-model="currentBlog.content"
			:subfield="false"
			:defaultOpen="'preview'"
			:toolbarsFlag="false"
			:editable="false"
			codeStyle="atom-one-light"
			previewBackground="#ffffff"
			boxShadowStyle="none"
			style="height: 100%; width: 100%; min-height: 100%"
		/>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ArrowLeftBold } from "@element-plus/icons-vue";

import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const blogId = ref(0);
blogId.value = new Number(route.params.blogId).valueOf();

const currentBlog: any = ref({
	currentBlogId: blogId,
	content: "# helloc",
});
</script>

<style scoped></style>
