<template>
	<div class="showBlog">
		<el-page-header content="博客详情" title="返回" @back="goBack" />
		<div class="blogContent">
			<div class="left">
				<p class="author" @click="showAuthorDetail"><span>作者:</span> {{ currentBlog.blogAuthorName }}</p>
				<el-avatar :size="50" alt="加载失败" :src="currentBlog.blogAuthorAvatar" />
				<p><span>访问量:</span> {{ currentBlog.blogVisitNumber }}</p>
				<p><span>收藏量:</span> {{ currentBlog.blogCollectNumber }}</p>
				<p><span>喜欢👎:</span> {{ currentBlog.blogLikeNumber }}</p>
				<p><span>不喜欢👍:</span> {{ currentBlog.blogDislikeNumber }}</p>
				<el-button-group>
					<el-button>点赞</el-button>
					<el-button>点踩</el-button>
					<el-button>收藏</el-button>
				</el-button-group>
				<!-- 弹窗等信息 -->
				<el-drawer :show-close="false" direction="ltr" v-model="drawer">
					<template #title> <p style="font-size: 2rem; text-align: center">用户详细信息</p> </template>
					<div class="drawer-content">
						<el-avatar :size="50" alt="加载失败" :src="currentBlog.blogAuthorAvatar" />
						<p>张三</p>
						<p>个性签名</p>
						<el-button type="primary">关注ta</el-button>
					</div>
				</el-drawer>
			</div>
			<div class="center">
				<el-scrollbar>
					<h1 style="font-size: 3rem">{{ currentBlog.blogTitle }}</h1>
					<span> {{ currentBlog.blogCreateTime }}</span>
					<p>
						<i class="fa fa-tags" aria-hidden="true"></i>
						<span style="margin: 0 1%" v-for="tag in currentBlog.blogTags">{{ tag.tagContent }}</span>
					</p>
					<el-divider style="width: 95%" />
					<Editor
						v-model="currentBlog.blogContent"
						:subfield="false"
						:defaultOpen="'preview'"
						:toolbarsFlag="false"
						:editable="false"
						codeStyle="atom-one-light"
						previewBackground="#ffffff"
						boxShadowStyle="none"
						style="height: 100%; width: 99%; min-height: 100%"
					/>
					<el-divider style="width: 93%" />

					<el-input
						style="width: 93.5%"
						type="textarea"
						:rows="5"
						v-model="commentContent"
						placeholder="请输入评论内容..."
					/>
					<div style="width: 93.5%; margin: 1% 0; display: flex; justify-content: right">
						<el-button type="primary">评论</el-button>
					</div>

					<ul v-for="item in 5">
						<span>这是第{{ item }}条评论</span>
						<el-button>点赞</el-button>
						<el-button>点踩</el-button>
						<el-button>回复</el-button>
						<el-button>删除</el-button>
					</ul>
				</el-scrollbar>
			</div>

			<div class="right">右边不知道什么栏</div>
		</div>
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
	//用户详细信息
	const drawer = ref(false);
	const showAuthorDetail = () => {
		drawer.value = true;
	};

	//评论
	const commentContent = ref("");
</script>

<style scoped lang="less">
	.showBlog {
		p {
			font-size: 1rem;
		}
		.blogContent {
			height: 100%;
			padding: 3%;
			display: grid;
			grid-template-columns: 1fr 3fr 1fr;
			column-gap: normal;
			.left {
				padding: 3%;

				span {
					font-weight: 600;
				}
				.author {
					cursor: pointer;
					font-size: 1.5rem;

					&:hover {
						color: dodgerblue;
						text-decoration: underline;
					}
					.drawer-content {
						width: 100%;
					}
				}
			}
			.center {
				overflow-y: hidden;
				ul {
					width: 93.5%;
					background-color: aliceblue;
					margin: 3% 0;
				}
			}
			.right {
				padding: 3%;
			}
		}
	}
</style>
