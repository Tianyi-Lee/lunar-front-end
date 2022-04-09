<template>
	<div>
		<el-button :icon="DocumentAdd" type="primary" @click="newBlog"
			>开始创作</el-button
		>
		<p>判断如果博客条数为0，则提示！！！</p>
		<el-dialog
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
					<el-form :model="blog" label-width="80px">
						<el-form-item label="标题">
							<el-input v-model="blog.blogTitle" placeholder="请输入文章标题" />
						</el-form-item>
						<el-form-item label="摘要">
							<el-input
								v-model="blog.blogDigest"
								placeholder="请输入文章摘要"
							/>
						</el-form-item>
						<el-form-item label="可见性">
							<el-radio-group v-model="blog.blogForm">
								<el-radio border :label="0">公开</el-radio>
								<el-radio border :label="2">私有</el-radio>
							</el-radio-group>
							<p
								style="color: dodgerblue; margin-left: 5vw"
								v-if="blog.blogForm === 2"
							>
								仅自己可见，对其他人隐藏!!!
							</p>
							<p
								style="color: #13ce66; margin-left: 5vw"
								v-else="blog.blogForm === 0"
							>
								所有人可见，对其他人可见...
							</p>
						</el-form-item>
						<el-form-item label="类型">
							<el-radio-group v-model="blog.blogType">
								<el-radio border :label="0">原创</el-radio>
								<el-radio border :label="1">转载</el-radio>
							</el-radio-group>
							<p
								style="color: #13ce66; margin-left: 5vw"
								v-if="blog.blogType === 0"
							>
								原创作品!!!
							</p>
							<p
								style="color: dodgerblue; margin-left: 5vw"
								v-else="blog.blogType === 1"
							>
								转载他人作品...
							</p>
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
								<el-button
									v-else
									class="button-new-tag ml-1"
									@click="showInput"
								>
									+ New Tag
								</el-button>
							</div>
						</el-form-item>
						<el-form-item label="正文">
							<Editor
								v-model="blog.blogContent"
								:toolbars="toolbars"
								codeStyle="atom-one-light"
								fontSize="16px"
								:html="false"
								style="height: 100%; width: 100%; min-height: 66vh"
							/>
						</el-form-item>
						<el-form-item>
							<div style="width: 100%; display: flex">
								<el-button @click="dialogVisible = false">取消</el-button>
								<div style="flex: 1"></div>
								<el-button type="primary" @click="save">保存</el-button>
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

//博客标签编辑
const inputValue = ref("");
const dynamicTags = ref(["默认"]);
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
	dynamicTags.value.map((item, index) => {
		blog.value.tags[index] = item;
	});
	request.post("/blog", blog.value).then((res: any) => {
		if (res.code == "200") {
			ElMessage({
				type: "success",
				message: "创建成功",
			});
			dialogVisible.value = false;
		} else {
			ElMessage({
				type: "error",
				message: res.msg,
			});
		}
	});
};
</script>

<style scoped></style>
