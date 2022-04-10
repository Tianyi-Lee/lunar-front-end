<template>
	<div class="blogRecommend">
		<div class="content">
			<ul
				@click="$router.push('/home/blog/' + item.blogId)"
				class="item"
				v-for="item in items"
			>
				<p>{{ item.blogTitle }}</p>
				<span>
					<i class="fa fa-tags" aria-hidden="true"></i
					><el-tag effect="dark" v-for="tag in item.blogTags">{{ tag }}</el-tag>
				</span>
				<p>{{ item.blogAuthorName }}</p>
				<p>{{ item.blogCreateTime }}</p>
				<p>{{ item.blogDigest }}</p>
			</ul>
		</div>

		<el-pagination
			style="justify-content: center"
			layout="prev, pager, next"
			:total="total"
			:page-size="4"
			@prev-click="pageChange"
			@next-click="pageChange"
			@current-change="pageChange"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import request from "../../utils/request";
const items: any = ref([]);
const pageNumber = ref(1);
const pageSize = ref(4);
const total = ref(0);
const loadHotBlogs = () => {
	request
		.get("/blog/hot", {
			params: {
				pageNumber: pageNumber.value,
				pageSize: pageSize.value,
			},
		})
		.then((res: any) => {
			items.value = res.data.rows;
			total.value = new Number(res.data.total).valueOf();
		});
};
loadHotBlogs();
const pageChange = (newPageNumber: number) => {
	pageNumber.value = newPageNumber;
	loadHotBlogs();
};
</script>

<style scoped lang="less">
.blogRecommend {
	overflow-x: hidden;
	.content {
		height: 85%;
	}
}
.item {
	width: 100%;
	background-color: aliceblue;
	margin: 5vh auto;
}
</style>
