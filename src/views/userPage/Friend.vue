<template>
	<div class="friend">
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane label="我的关注" name="first">小孩</el-tab-pane>
			<el-tab-pane label="我的粉丝" name="third">小明</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import request from "../../utils/request";

const userId = sessionStorage.getItem("userId");

const loadFriend = () => {
	request
		.get(`/user/${userId}/follow/list`, {
			params: {
				pageNumber: 1,
				pageSize: 8,
			},
		})
		.then((res: any) => {
			console.log(res);
			console.log(`关注的人列表加载成功`);
		});
	request
		.get(`/user/${userId}/fan/list`, {
			params: {
				pageNumber: 1,
				pageSize: 8,
			},
		})
		.then((res: any) => {
			console.log(res);
			console.log(`粉丝列表加载成功`);
		});
};
loadFriend();

const activeName = ref("first");
const handleClick = (tab: string, event: Event) => {
	console.log(tab, event);
};
</script>

<style scoped>
.friend {
	font-size: 1.5rem;
}

.demo-tabs > .el-tabs__content {
	padding: 32px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
</style>
