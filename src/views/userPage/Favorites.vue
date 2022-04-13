<template>
	<div class="favorites">
		<div class="function">
			<el-popover placement="right" :width="200" trigger="click">
				<template #reference>
					<el-button
						style="margin-left: 3vw; margin-right: 16%"
						type="primary"
						plain
						>新建收藏夹</el-button
					>
				</template>
				<div style="display: grid; justify-items: center">
					<el-input
						v-model="newFolderName"
						placeholder="请输入收藏夹名称"
						clearable
					/>
					<el-button
						style="margin-top: 1vh"
						size="small"
						type="primary"
						@click="createFolder"
						>创建</el-button
					>
				</div>
			</el-popover>
			<span 
				><strong style="font-size: 2rem;margin-right: 2vw;">tips:</strong>鼠标右键单击收藏夹即可进行重命名,删除操作</span
			>
		</div>
		<div class="folder">
			<el-popover
				:offset="offset"
				v-model:visible="visible"
				placement="top"
				title="操作"
			>
				<template #reference>
					<el-card class="left">
						<p style="text-align: center;height: 35px;">收藏夹</p>
						<el-divider content-position="center">***</el-divider>

						<el-button-group size="large" class="btng">
							<el-button
								v-for="(item, index) in folderList"
								class="btn"
								@click="showFolder(item.folderId, index)"
								@click.right.prevent="operate(item.folderId, index)"
								>{{ item.folderName }}</el-button
							>
						</el-button-group>
					</el-card>
				</template>
				<div style="display: grid">
					<div style="display: flex">
						<el-popover placement="right" width="200px" trigger="hover">
							<template #reference>
								<el-button size="small" type="primary">重命名</el-button>
							</template>
							<div style="display: grid; justify-items: center">
								<el-input
									v-model="changedName"
									placeholder="请输入收藏夹新名称"
									clearable
								/>
								<el-button
									style="margin-top: 1vh"
									size="small"
									type="primary"
									@click="rename"
									>确定</el-button
								>
							</div>
						</el-popover>

						<el-popconfirm
							confirm-button-text="确定"
							cancel-button-text="我再想想"
							:icon="InfoFilled"
							icon-color="red"
							title="确定删除该收藏夹?"
							@confirm="remove"
							@cancel=""
						>
							<template #reference>
								<el-button size="small" type="danger">删除</el-button>
							</template>
						</el-popconfirm>
					</div>
					<el-button style="justify-self: flex-end" type="text" @click="cancel"
						>取消</el-button
					>
				</div>
			</el-popover>
			<el-card class="right">
				<p style="text-align: center; height: 35px">
					<span v-if="selectedFolderName===''">收藏夹内容</span>
					<p style="margin-bottom: 1%;">
						<strong>{{ selectedFolderName }}</strong>
					</p>
					<p>
						<i v-if="selectedFolderName" class="fa fa-calendar-o" aria-hidden="true"></i>
						<span style="margin-left: 3%;">{{ selectedFolderCreateTime.slice(0,10) }}</span>
					</p>
					
				</p>
				<el-divider content-position="center">***</el-divider>
				<ul @click="$router.push(`/userPage/blog/${item.blogId}`)" v-for="item in selectedFolderContent">
					<p>标题:{{item.blogTitle}}</p>
					<p>简介{{item.blogDigest}}</p>
					<p>作者{{item.blogAuthorName}}</p>
					<p>创建时间{{item.blogCreateTime}}</p>
					<p>
						<i class="fa fa-tags" aria-hidden="true"></i>
						<el-tag
							style="margin-right: 1vw"
							class="ml-2 tag"
							effect="dark"
							v-for="tag in item.blogTags"
						>{{ tag.tagContent }}</el-tag>
					</p>
				</ul>
			</el-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import request from "../../utils/request";
const userId = sessionStorage.getItem("userId");

//加载收藏夹列表
const folderList: any = ref([]);
const loadFolderList = () => {
	request
		.get("/folder/list", {
			params: {
				userId: userId,
				pageNumber: 1,
				pageSize: 8,
			},
		})
		.then((res: any) => {
			folderList.value = res.data;
		});
};
loadFolderList();

//某个收藏夹的内容
const selectedFolderName = ref("");
const selectedFolderCreateTime = ref("");
const selectedFolderContentTotal = ref<number>();
const selectedFolderContent: any = ref([]);
const selectedFolderId = ref<number>();
const selectedFolderIndex = ref<number>();
const showFolder = (folderId: number, index: number) => {
	selectedFolderId.value = folderId;
	selectedFolderIndex.value = index;
	request
		.get(`/folder/${selectedFolderId.value}`, {
			params: {
				pageNumber: 1,
				pageSize: 8,
			},
		})
		.then((res: any) => {
			selectedFolderContent.value = res.data.page.rows;
			console.log(selectedFolderContent.value);
			
			selectedFolderContentTotal.value = res.data.page.total;
			selectedFolderCreateTime.value = res.data.folderCreateTime;
			selectedFolderName.value = res.data.folderName;
		});
};

const offset = ref(-90);
const visible = ref(false);
const operatedFolderId = ref<number>();
const operatedFolderIndex = ref<number>();
const operate = (folderId: number, index: number) => {
	operatedFolderId.value = folderId;
	operatedFolderIndex.value = index;
	offset.value = -90;
	offset.value = offset.value - index * 48;
	visible.value = true;
};
const remove = () => {
	request.delete(`/folder/${operatedFolderId.value}`).then((res: any) => {
		if (res.code === 200) {
			ElMessage({ type: "success", message: "删除成功" });
			loadFolderList();
			visible.value = false;
		}
	});
};
const changedName = ref("");
const rename = () => {
	const formData = new FormData();
	formData.append("folderName", changedName.value);
	request
		.put(`/folder/${operatedFolderId.value}/name`, formData)
		.then((res: any) => {
			if (res.code === 200) {
				ElMessage({ type: "success", message: "修改成功" });
				if (typeof operatedFolderIndex.value !== "undefined") {
					folderList.value[operatedFolderIndex.value].folderName =
						changedName.value;
				}
				visible.value = false;
				changedName.value = "";
			}
		});
};
const cancel = () => {
	visible.value = false;
	changedName.value = ""
	setTimeout(() => {
		offset.value = -90;
	}, 500);
};

const newFolderName = ref("");
const createFolder = () => {
	request
		.post("/folder", { folderName: newFolderName.value })
		.then((res: any) => {
			if (res.code === 200) {
				ElMessage({ type: "success", message: "创建成功" });
				newFolderName.value = "";
				loadFolderList();
			}
		});
};
</script>

<style scoped lang="less">
.function {
	margin-bottom: 1%;
	box-shadow: var(--el-box-shadow-light);
	border: 1px solid var(--el-card-border-color);
	border-radius: 5px;
	background-color: var(--el-card-bg-color);
	height: 10%;
	display: flex;
	align-items: center;
	font-size: 1.5rem;
}
.folder {
	display: flex;
	height: 100%;
	width: 100%;
	@contentHeight: 86%;
	.left {
		width: 240px;
		height: @contentHeight;
		border-radius: 15px;
		.btng {
			display: grid;
			.btn {
				margin-top: 1vh;
			}
		}
	}
	.right {
		width: 99%;
		height: @contentHeight;
		margin-left: 2vw;
		ul {
			background-color: aliceblue;
			width: 100%;
			margin: 1vh auto;
			cursor: pointer;
			border-radius: 15px;
		}
	}
}
</style>
