<template>
	<div class="showBlog">
		<el-page-header content="博客详情" title="返回" @back="goBack" />
		<div class="blogContent">
			<div class="left">
				<p class="author"><span>作者:</span> {{ authorDetail.userName }}</p>
				<el-avatar :size="50" alt="加载失败" :src="authorDetail.userAvatar" />
				<p><span>性别: </span>{{ authorDetail.userGender }}</p>
				<p><span>个性签名: </span>{{ authorDetail.userSignature }}</p>
				<p><span>ta关注的人: </span>{{ authorDetail.userFollowNumber }}</p>
				<p><span>关注ta的人: </span>{{ authorDetail.userFansNumber }}</p>
				<p><span>文章数: </span>{{ authorDetail.userArticleNumber }}</p>
				<p><span>所在地区: </span>{{ authorDetail.userArea }}</p>
				<el-button v-if="isFollow === false" @click="followTa" plain>
					<i style="margin-right: 5%" class="fa fa-eye" aria-hidden="true"></i><span>关注ta</span>
				</el-button>
				<el-button v-else @click="cancelFollowTa" plain>
					<i style="margin-right: 5%" class="fa fa-check" aria-hidden="true"></i><span>已关注</span>
				</el-button>
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
						<el-button @click="sendComment" type="primary">评论</el-button>
					</div>

					<li class="comment-list" v-for="item in commentList">
						<div><el-avatar :size="50" alt="加载失败" :src="item.commentAuthorAvatar" /></div>
						<div class="comment-content">
							<p style="font-size: 1.25rem">{{ item.commentAuthorName }}</p>
							<p>
								{{ item.commentContent }}
							</p>
							<p style="display: flex; justify-content: space-between">
								<span style="font-size: 0.7rem">{{ item.commentCreateTime }}</span>
								<span>
									<el-button @click="deleteComment(item.commentId)" type="text">删除</el-button>
									<el-button @click="openDia(item.commentId)" type="text">回复</el-button>
								</span>
							</p>
							<div class="comment-content-children">
								<li class="comment-list" v-for="child in item.children">
									<div><el-avatar :size="50" alt="加载失败" :src="child.commentAuthorAvatar" /></div>
									<div class="comment-content">
										<p style="font-size: 1.25rem">{{ child.commentAuthorName }}</p>
										<p>
											{{ child.commentContent }}
										</p>
										<p style="display: flex; justify-content: space-between">
											<span style="font-size: 0.7rem">{{ child.commentCreateTime }}</span>
											<span>
												<el-button @click="deleteComment(child.commentId)" type="text">删除</el-button>
												<el-button @click="openDia(child.commentId)" type="text">回复</el-button>
											</span>
										</p>
									</div>
								</li>
							</div>
						</div>
					</li>
				</el-scrollbar>
			</div>

			<div class="right">
				<p><span>访问量:</span> {{ currentBlog.blogVisitNumber }}</p>
				<p><span>收藏量:</span> {{ currentBlog.blogCollectNumber }}</p>
				<p><span>点赞量👍:</span> {{ currentBlog.blogLikeNumber }}</p>
				<p><span>点踩量👎:</span> {{ currentBlog.blogDislikeNumber }}</p>
				<el-button-group>
					<el-button @click="likeBlog" v-if="isLike === false"
						><i class="fa fa-thumbs-o-up" aria-hidden="true"></i
					></el-button>
					<el-button @click="cancelLikeBlog" style="color: dodgerblue" v-else
						><i class="fa fa-thumbs-up" aria-hidden="true"></i
					></el-button>

					<el-button @click="dislikeBlog" v-if="isDislike === false"
						><i class="fa fa-thumbs-o-down" aria-hidden="true"></i
					></el-button>
					<el-button @click="cancelDislikeBlog" style="color: dodgerblue" v-else
						><i class="fa fa-thumbs-down" aria-hidden="true"></i
					></el-button>

					<el-popover placement="bottom" width="Min width 250px" v-model:visible="visible">
						<template #reference>
							<el-button v-if="isCollect === false" @click="openCollect"
								><i class="fa fa-star-o" aria-hidden="true"></i
							></el-button>
							<el-button style="color: dodgerblue" v-else><i class="fa fa-star" aria-hidden="true"></i></el-button>
						</template>
						<div style="display: grid; justify-items: center">
							<el-button-group size="large" class="btng">
								<el-button @click="collectBlog(item.folderId)" v-for="item in folders" class="btn">{{
									item.folderName
								}}</el-button>
							</el-button-group>
							<el-button @click="visible = false">取消</el-button>
						</div>
					</el-popover>
				</el-button-group>
			</div>
		</div>
		<!-- 回复的弹出框 -->
		<el-dialog v-model="dialogVisible" title="回复消息" width="30%" center>
			<el-input v-model="replyContent" />
			<template #footer>
				<el-button @click="replyComment" type="primary">回复</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
	import { ElMessage } from "element-plus";
	import { ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import request from "../utils/request";

	const userId = sessionStorage.getItem("userId");
	const router = useRouter();
	const goBack = () => {
		router.back();
	};
	const route = useRoute();
	const blogId = ref<number>();
	blogId.value = new Number(route.params.blogId).valueOf();

	//加载该博客
	const currentBlog: any = ref({});
	const showthisBlog = () => {
		request.get(`/blog/${blogId.value}`).then((res: any) => {
			currentBlog.value = res.data;
			showAuthorDetail();
			init();
		});
	};
	showthisBlog();

	//用户详细信息
	const authorDetail = ref<any>({ userAvatar: "" });
	const showAuthorDetail = () => {
		request.get(`/user/${currentBlog.value.blogAuthorId}/detail`).then((res: any) => {
			authorDetail.value = res.data;
		});
	};

	//初始化状态
	const init = () => {
		request.get(`/blog/${blogId.value}/like`).then((res: any) => {
			isLike.value = res.data.hasLike;
		});
		request.get(`/blog/${blogId.value}/dislike`).then((res: any) => {
			isDislike.value = res.data.hasDislike;
		});
		request.get(`/user/${currentBlog.value.blogAuthorId}/follow`).then((res: any) => {
			isFollow.value = res.data.hasFollow;
		});
		request.get(`/blog/${blogId.value}/collect`).then((res: any) => {
			isCollect.value = res.data.hasCollect;
		});
	};

	//点赞点踩收藏
	const visible = ref(false);
	const isLike = ref(false);
	const isDislike = ref(false);
	const likeBlog = () => {
		isLike.value = true;
		currentBlog.value.blogLikeNumber += 1;
		request.post(`/blog/${blogId.value}/like`).then((res: any) => {
			ElMessage({ type: "success", message: "点赞成功" });
		});
	};
	const cancelLikeBlog = () => {
		isLike.value = false;
		request.delete(`/blog/${blogId.value}/like`).then((res: any) => {
			currentBlog.value.blogLikeNumber -= 1;
			ElMessage({ type: "success", message: "取消点赞成功" });
		});
	};

	const dislikeBlog = () => {
		request.post(`/blog/${blogId.value}/dislike`).then((res: any) => {
			isDislike.value = true;
			currentBlog.value.blogDislikeNumber += 1;
			ElMessage({ type: "success", message: "点踩成功" });
		});
	};
	const cancelDislikeBlog = () => {
		isDislike.value = false;
		request.delete(`/blog/${blogId.value}/dislike`).then((res: any) => {
			currentBlog.value.blogDislikeNumber -= 1;
			ElMessage({ type: "success", message: "取消点踩成功" });
			console.log(res);
		});
	};

	const folders = ref<Array<any>>();
	const openCollect = () => {
		visible.value = true;
		request
			.get(`/folder/list`, {
				params: {
					userId: userId,
					pageNumber: 1,
					pageSize: 8,
				},
			})
			.then((res: any) => {
				folders.value = res.data;
			});
	};

	//
	const isCollect = ref(false);
	const collectBlog = (folderId: number) => {
		const formData = new FormData();
		formData.append("folderId", new String(folderId).valueOf());
		request.post(`/blog/${blogId.value}/collect`, formData).then((res: any) => {
			if (res.code === 200) {
				ElMessage({ type: "success", message: "收藏成功" });
				isCollect.value = true;
			} else ElMessage({ type: "error", message: res.msg });
		});
	};

	//关注该用户
	const isFollow = ref(false);
	const followTa = () => {
		request.post(`/user/${currentBlog.value.blogAuthorId}/follow`).then((res: any) => {
			isFollow.value = true;
			ElMessage({ type: "success", message: "关注成功" });
		});
	};
	const cancelFollowTa = () => {
		request.delete(`/user/${currentBlog.value.blogAuthorId}/follow`).then((res: any) => {
			isFollow.value = false;
			ElMessage({ type: "success", message: "取消关注成功" });
		});
	};

	//评论
	const commentList = ref<Array<any>>();
	const loadComment = () => {
		request
			.get(`/comment/list`, {
				params: {
					blogId: blogId.value,
					pageNumber: 1,
					pageSize: 8,
				},
			})
			.then((res: any) => {
				commentList.value = res.data.rows;
			});
	};
	loadComment();
	const commentContent = ref("");
	const sendComment = (commentParentId?: number, rContent?: string) => {
		request
			.post(`/comment`, {
				commentBlogId: blogId.value,
				commentParentId: typeof commentParentId === "number" ? commentParentId : null,
				commentContent: rContent ? rContent : commentContent.value,
			})
			.then((res: any) => {
				ElMessage({ type: "success", message: "评论发送成功" });
				commentContent.value = "";
				replyContent.value = "";
				loadComment();
			});
	};
	const deleteComment = (commentId: number) => {
		request.delete(`/comment/${commentId}`).then((res: any) => {
			ElMessage({ type: "success", message: "删除成功" });
			loadComment();
		});
	};
	//回复
	const dialogVisible = ref(false);
	const replyContent = ref("");
	const commentParentId = ref<number>();
	const openDia = (ParentId: number) => {
		dialogVisible.value = true;
		commentParentId.value = ParentId;
	};
	const replyComment = () => {
		sendComment(commentParentId.value, replyContent.value);
		dialogVisible.value = false;
	};
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
					font-size: 1.5rem;
				}
			}
			.center {
				overflow-y: hidden;
				.comment-list {
					width: 93.5%;
					margin: 3% 0;
					list-style: none;
					display: grid;
					grid-template-columns: 1fr 7fr;
					align-items: flex-start;
					.comment-content {
						display: grid;
						width: 100%;
						.comment-content-children {
							border: 1px solid white;
						}
					}
				}
			}
			.right {
				padding: 3%;
			}
		}
	}
	.btng {
		display: grid;
		.btn {
			margin-top: 1vh;
		}
	}
</style>
