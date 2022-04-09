<template>
	<!-- 这是整个网站的首页 -->
	<div class="home">
		<div class="header">
			<div class="left animate__animated animate__zoomIn">
				<img src="../assets/images/websitelogo.svg" alt="logo" />
				<p>Lunar</p>
			</div>
			<div class="center"></div>
			<div class="right">
				<el-button type="text" @click="$router.push('/login')"
					><p>登录/注册</p></el-button
				>
			</div>
		</div>
		<div class="main">
			<div class="main-left">
				<div class="main-left-content">
					<el-carousel style="height: 530px" direction="vertical">
						<el-carousel-item v-for="item in 4" :key="item">
							<h3>{{ item }}</h3>
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
			<div class="main-right">
				<div id="card">
					<el-scrollbar>
						<div
							v-for="(item, index) in blogItems"
							:key="item.blogId"
							class="scrollbar-demo-item"
							type="text"
							@click="show(item, index)"
						>
							<div class="itemClass">
								<p>
									<span
										style="
											font-size: 2.5rem;
											display: inline-block;
											width: 20vw;
										"
										title="标题"
										class="withHover"
									>
										{{ item.blogTitle }}
									</span>
									<span>
										<i class="fa fa-tags" aria-hidden="true"></i
										><el-tag
											style="margin-right: 1vw"
											class="ml-2 tag"
											effect="dark"
											v-for="tag in item.blogTags"
											>{{ tag }}</el-tag
										>
									</span>
								</p>
								<p>
									<span style="text-indent: 2em">
										<i class="fa fa-user" aria-hidden="true"></i>
										{{ item.blogAuthorName }}

										<i
											style="margin-left: 2vw"
											class="fa fa-clock-o"
											aria-hidden="true"
										></i
										>{{ item.blogCreateTime }}
									</span>
								</p>

								<p style="text-indent: 2em">
									{{ item.blogDigest }}
								</p>
							</div>
						</div>
					</el-scrollbar>
				</div>
			</div>
		</div>
		<el-dialog top="3vh" v-model="dialogVisible" center width="50%">
			<template #title>
				<span style="font-size: 2rem">{{ currentBlog.blogTitle }}</span>
			</template>

			<div style="height: 77vh; overflow: auto">
				<el-scrollbar style="padding-right: 1%">
					<p>{{ currentBlog.blogAuthorName }}</p>
					<p>{{ currentBlog.blogCreateTime }}</p>
					<p>{{ currentBlog.blogCollectNumber }}</p>
					<p>{{ currentBlog.blogDislikeNumber }}</p>
					<p>{{ currentBlog.blogShareNumber }}</p>
					<p>{{ currentBlog.blogLikeNumber }}</p>
					<p>{{ currentBlog.blogTags }}</p>
					<p>{{ currentBlog.blogVisitNumber }}</p>
					<Editor
						v-model="currentBlog.blogContent"
						:subfield="false"
						:defaultOpen="'preview'"
						:toolbarsFlag="false"
						:editable="false"
						codeStyle="atom-one-light"
						style="height: 100%; width: 100%"
					/>
				</el-scrollbar>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import request from "../utils/request";

let blogItems: any = ref([]);

request
	.get("/blog/hot", {
		params: {
			pageNumber: 1,
			pageSize: 8,
		},
	})
	.then((res: any) => {
		if (res.code == "200") {
			blogItems.value = res.data.rows;
		} else {
			ElMessage({ type: "error", message: res.msg });
		}
	});

let dialogVisible = ref(false);
let currentBlog: any = ref({});
let currentIndex: number;

const show = async (selectedBlog: any, index: number) => {
	await request.get(`/blog/${selectedBlog.blogId}`).then((res: any) => {
		if (res.code == "200") {
			currentBlog.value = res.data;
		}
	});
	currentIndex = index;
	dialogVisible.value = true;
};
</script>

<style scoped lang="less">
.home {
	height: 100vh;
	width: 100vw;

	.header {
		width: 100%;
		height: 10vh;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		line-height: 10vh;
		display: flex;
		.left {
			width: 250px;
			display: flex;

			justify-content: center;
			align-items: center;
			p {
				font-size: 2rem;
				margin-left: 15px;
				color: dodgerblue;
			}
		}
		.center {
			flex: 1;
		}
		.right {
			width: 15vw;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			p {
				font-size: 1.5rem;
			}
		}
	}

	.main {
		display: flex;
		height: calc(100vh - 10vh);
		@leftWidth: 300px;

		.main-left {
			width: @leftWidth;

			padding: 50px 0px;
			.main-left-content {
				border-radius: 15px;
				height: 100%;
				margin-left: 20%;
				padding: 10px;
				width: 80%;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			}
		}

		.main-right {
			width: calc(100vw - @leftWidth);
			padding: 50px 50px;

			#card {
				height: 100%;
				box-shadow: var(--el-box-shadow-light);
				padding: 10px 5px;
				border-radius: 15px;
				.scrollbar-demo-item {
					cursor: pointer;
					display: flex;
					align-items: flex-start;
					justify-content: left;
					width: 98%;
					margin: 10px;
					text-align: left;
					border-radius: 15px;
					background: var(--el-color-primary-light-9);
					color: var(--el-color-primary);
					.itemClass {
						color: black;
						.withHover:hover {
							text-decoration: underline;
							color: dodgerblue;
						}
						p {
							margin: 2vh;
							i {
								margin-right: 1vw;
							}
						}
					}
				}
			}
		}
	}
}

.el-carousel__item {
	min-height: 530px;

	h3 {
		color: #475669;
		font-size: 1.5rem;
		opacity: 0.75;
		line-height: 530px;
		text-align: center;
	}
}
.el-carousel__item:nth-child(2n) {
	background: #ecf5ff;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #bcd5f1;
}
</style>
