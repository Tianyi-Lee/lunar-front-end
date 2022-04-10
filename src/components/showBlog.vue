<template>
	<div class="showBlog">
		<el-page-header content="博客详情" title="返回" @back="goBack" />
		<el-scrollbar>
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
			<p>blogId: {{ currentBlog.currentBlogId }}</p>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
	router.back();
};
const route = useRoute();
const blogId = ref(0);
blogId.value = new Number(route.params.blogId).valueOf();

const currentBlog: any = ref({
	currentBlogId: blogId,
	content: "# helloc",
});
</script>

<style scoped lang="less">
.showBlog {
	p {
		font-size: 1.5rem;
	}
}
</style>
