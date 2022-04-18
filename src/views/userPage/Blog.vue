<template>
	<div class="blog">
		<div class="function">
			<el-button :icon="DocumentAdd" type="primary" @click="newBlog">开始创作 </el-button>
		</div>
		<h1 v-if="blogList.length === 0">还没有创建任何博客，快去编辑并发布你的第一条博客吧</h1>
		<div class="content">
			<ul @click="$router.push(`/userPage/blog/${item.blogId}`)" v-for="item in blogList">
				<div class="itemOperate">
					<el-button size="small" type="primary" @click.stop="modifyBlog(item.blogId, item.blogDigest)">修改</el-button>
					<el-button size="small" type="danger" @click.stop="removeBlog(item.blogId)">删除</el-button>
				</div>
				<p>标题 {{ item.blogTitle }}</p>
				<p>
					<i class="fa fa-tags" aria-hidden="true"></i
					><el-tag style="margin-right: 1vw" class="ml-2 tag" effect="dark" v-for="tag in item.blogTags">{{
						tag.tagContent
					}}</el-tag>
				</p>
				<p>创建时间 {{ item.blogCreateTime }}</p>
				<p>简介 {{ item.blogDigest }}</p>
			</ul>
		</div>
		<div class="pagination">
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

		<!-- 以下为弹窗内容 -->
		<el-dialog top="3vh" :show-close="false" v-model="dialogVisible" center width="80%" :append-to-body="true">
			<template #title>
				<p style="font-size: 2rem; font-weight: 500; color: dodgerblue">博客创作</p>
			</template>
			<div style="height: 77vh; overflow: auto">
				<el-scrollbar style="padding-right: 1%">
					<el-form :model="blog" label-width="80px">
						<el-form-item label="标题">
							<el-input v-model="blog.blogTitle" placeholder="请输入文章标题" />
						</el-form-item>
						<el-form-item label="摘要">
							<el-input v-model="blog.blogDigest" placeholder="请输入文章摘要" />
						</el-form-item>
						<el-form-item label="可见性">
							<el-radio-group v-model="blog.blogForm">
								<el-radio border :label="0">公开</el-radio>
								<el-radio border :label="2">私有</el-radio>
							</el-radio-group>
							<p style="color: dodgerblue; margin-left: 5vw" v-if="blog.blogForm === 2">仅自己可见，对其他人隐藏!!!</p>
							<p style="color: #13ce66; margin-left: 5vw" v-else="blog.blogForm === 0">所有人可见，对其他人可见...</p>
						</el-form-item>
						<el-form-item label="类型">
							<el-radio-group v-model="blog.blogType">
								<el-radio border :label="0">原创</el-radio>
								<el-radio border :label="1">转载</el-radio>
							</el-radio-group>
							<p style="color: #13ce66; margin-left: 5vw" v-if="blog.blogType === 0">原创作品!!!</p>
							<p style="color: dodgerblue; margin-left: 5vw" v-else="blog.blogType === 1">转载他人作品...</p>
						</el-form-item>
						<el-form-item label="标签">
							<div>
								<el-tag
									v-for="tag in dynamicTags"
									:key="tag"
									size="large"
									style="margin-right: 1vw"
									closable
									:disable-transitions="false"
									@close="handleClose(tag)"
								>
									{{ tag }}
								</el-tag>
								<el-input
									v-if="inputVisible"
									ref="InputRef"
									v-model="inputValue"
									style="margin-top: 2vh"
									@keyup.enter="handleInputConfirm"
									@blur="handleInputConfirm"
								/>
								<el-button v-else class="button-new-tag ml-1" @click="showInput"> + 点击创建标签 </el-button>
								<span v-if="dynamicTags.length === 0" style="color: red">!!!不创建任何标签则为默认</span>
							</div>
						</el-form-item>
						<el-form-item label="正文">
							<Editor
								ref="md"
								v-model="blog.blogContent"
								:toolbars="toolbars"
								codeStyle="atom-one-light"
								fontSize="16px"
								:html="false"
								style="height: 100%; width: 100%; min-height: 66vh"
								@imgAdd="imgAdd"
							/>
						</el-form-item>
						<el-form-item>
							<div style="width: 100%; display: flex">
								<el-button type="primary" @click="save">保存</el-button>
								<div style="flex: 1"></div>
								<el-button @click="cancel">取消</el-button>
							</div>
						</el-form-item>
					</el-form>
				</el-scrollbar>
			</div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
	import { DocumentAdd } from "@element-plus/icons-vue";
	import { ElMessage } from "element-plus";
	import { nextTick, ref } from "vue";
	import type { ElInput } from "element-plus";
	import request from "../../utils/request";
	import { handleElButtonBlur } from "../../utils/handleButton";
	//md编辑器展示内容
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
		help: true, // 帮助
		undo: true, // 上一步
		redo: true, // 下一步
		trash: true, // 清空
		navigation: true, // 导航目录
		alignleft: true, // 左对齐
		aligncenter: true, // 居中
		alignright: true, // 右对齐
		subfield: true, // 单双栏模式
		preview: true, // 预览
	};

	//分页插件初始化
	const userId = sessionStorage.getItem("userId");
	const pageNumber = ref(1);
	const pageSize = ref(4);
	const total = ref(0);
	const pageChange = (newPageNumber: number) => {
		pageNumber.value = newPageNumber;
		loadMyBlog();
	};

	//加载我的博客
	const blogList: any = ref([]);
	const loadMyBlog = () => {
		request
			.get(`/user/${userId}/blog/list`, {
				params: {
					pageNumber: pageNumber.value,
					pageSize: pageSize.value,
				},
			})
			.then((res: any) => {
				blogList.value = res.data.rows;
				total.value = new Number(res.data.total).valueOf();
			});
	};
	loadMyBlog();

	//operate
	const modifiedBlog: any = ref({});
	const modifyBlog = (blogId: number, blogDigest: string) => {
		request.get(`/blog/${blogId}`).then((res: any) => {
			modifiedBlog.value.blogId = blogId;
			modifiedBlog.value.blogDigest = blogDigest;
			modifiedBlog.value.blogTitle = res.data.blogTitle;
			modifiedBlog.value.blogForm = res.data.blogForm;
			modifiedBlog.value.blogType = res.data.blogType;
			modifiedBlog.value.tags = [];
			res.data.blogTags.forEach((item: any) => {
				dynamicTags.value.push(item.tagContent);
			});
			modifiedBlog.value.blogContent = res.data.blogContent;
			blog.value = JSON.parse(JSON.stringify(modifiedBlog.value));
			dialogVisible.value = true;
		});
	};
	const removeBlog = (blogId: number) => {
		request.delete(`/blog/${blogId}`).then((res: any) => {
			loadMyBlog();
		});
	};

	//博客标签编辑
	const inputValue = ref("");
	const dynamicTags = ref<string[]>([]);
	const inputVisible = ref(false);
	const InputRef = ref<InstanceType<typeof ElInput>>();
	const handleClose = (tag: string) => {
		dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
	};
	const showInput = () => {
		inputVisible.value = true;
		nextTick(() => {
			InputRef.value!.input!.focus();
		});
	};
	const handleInputConfirm = () => {
		if (inputValue.value) {
			dynamicTags.value.push(inputValue.value);
		}
		inputVisible.value = false;
		inputValue.value = "";
	};
	//标签编辑结束

	//md中添加图片
	const md: any = ref(null);
	const imgAdd = (filename: String, imgFile: File) => {
		const formData = new FormData();
		formData.append("file", imgFile);
		request.post("/upload", formData).then((res: any) => {
			//上传成功替换md中的内容
			if (res.code == "200") if (md.value) md.value.$img2Url(filename, res.data.url);
		});
	};

	//创建新的博客
	const blog: any = ref({
		blogForm: 0,
		blogType: 0,
		blogTitle: "",
		blogDigest: "",
		blogContent: "",
		tags: [],
	});
	const dialogVisible = ref(false);
	const newBlog = (e: any) => {
		handleElButtonBlur(e);
		dialogVisible.value = true;
	};
	const save = () => {
		if (dynamicTags.value.length === 0) {
			blog.value.tags.push("默认");
		} else
			dynamicTags.value.map((item) => {
				blog.value.tags.push(item);
			});
		if (blog.value.blogId) {
			request.put(`/blog/${blog.value.blogId}`, blog.value).then((res: any) => {
				if (res.code == "200") {
					ElMessage({
						type: "success",
						message: "修改成功",
					});
					dialogVisible.value = false;
					loadMyBlog();
				} else {
					ElMessage({
						type: "error",
						message: res.msg,
					});
				}
			});
		} else {
			request.post("/blog", blog.value).then((res: any) => {
				if (res.code == "200") {
					ElMessage({
						type: "success",
						message: "创建成功",
					});
					dialogVisible.value = false;
					loadMyBlog();
				} else {
					ElMessage({
						type: "error",
						message: res.msg,
					});
				}
			});
		}
		//
		dynamicTags.value.length = 0;
		blog.value = {
			blogForm: 0,
			blogType: 0,
			blogTitle: "",
			blogDigest: "",
			blogContent: "",
			tags: [],
		};
	};
	const cancel = () => {
		dialogVisible.value = false;
		blog.value = {
			blogForm: 0,
			blogType: 0,
			blogTitle: "",
			blogDigest: "",
			blogContent: "",
			tags: [],
		};
		dynamicTags.value.length = 0;
	};
</script>

<style scoped lang="less">
	.blog {
		overflow-x: hidden;
		.pagination {
			width: 100%;
		}
	}
	.function {
		height: 6%;
		display: flex;
		align-items: center;
	}
	.content {
		height: 80%;
		ul {
			cursor: pointer;
			width: 100%;
			background-color: aliceblue;
			border-radius: 15px;
			margin: 5vh auto;
			position: relative;
			.itemOperate {
				display: none;
				position: absolute;
				left: 90%;
				top: 35%;
			}
		}
		ul:hover {
			.itemOperate {
				display: block;
			}
		}
	}
</style>
