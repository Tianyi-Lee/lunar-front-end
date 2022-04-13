<template>
	<div class="showBlog">
		<el-page-header content="博客详情" title="返回" @back="goBack" />
		<el-scrollbar>
			<p>blogAuthorName: {{ currentBlog.blogAuthorName }}</p>
			<p>blogTitle: {{ currentBlog.blogTitle }}</p>
			<p>
				blogTags:
				<span style="margin: 0 1%" v-for="tag in currentBlog.blogTags">{{
					tag.tagContent
				}}</span>
			</p>
			<p>blogCreateTime: {{ currentBlog.blogCreateTime }}</p>

			<p>blogVisitNumber: {{ currentBlog.blogVisitNumber }}</p>
			<p>blogShareNumber: {{ currentBlog.blogShareNumber }}</p>
			<p>blogCollectNumber: {{ currentBlog.blogCollectNumber }}</p>
			<p>blogDislikeNumber: {{ currentBlog.blogDislikeNumber }}</p>
			<p>blogLikeNumber: {{ currentBlog.blogLikeNumber }}</p>

			<Editor
				v-model="currentBlog.blogContent"
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
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import request from "../utils/request";

const router = useRouter();
const goBack = () => {
	router.back();
};
const route = useRoute();
const blogId = ref<number>();
blogId.value = new Number(route.params.blogId).valueOf();

//加载该博客
const currentBlog: any = ref({});
request.get(`/blog/${blogId.value}`).then((res: any) => {
	currentBlog.value = res.data;
});
</script>

<style scoped lang="less">
.showBlog {
	p {
		font-size: 1.5rem;
	}
}
</style>
