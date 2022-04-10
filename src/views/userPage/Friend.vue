<template>
	<div class="friend">
		<div class="selectors">
			<div class="selector">
				<ul :class="{ active: isActive === true }" @click="follow">
					<span>我的关注</span>
				</ul>
				<ul :class="{ active: isActive === false }" @click="fan">
					<span>我的粉丝</span>
				</ul>
			</div>
		</div>
		<div class="content">
			<el-card class="list">
				<h2>好友列表</h2>
				<el-divider style="margin: 4px"></el-divider>
			</el-card>
			<el-card class="detail">
				<h2>详情信息</h2>
				<el-divider style="margin: 4px"></el-divider>
			</el-card>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import request from "../../utils/request";

const isActive = ref(true);

const userId = sessionStorage.getItem("userId");

const loadFriend = () => {
	request
		.get(`/user/${userId}/follow/list`, {
			params: {
				pageNumber: 1,
				pageSize: 8,
			},
		})
		.then((res: any) => {});
	request
		.get(`/user/${userId}/fan/list`, {
			params: {
				pageNumber: 1,
				pageSize: 8,
			},
		})
		.then((res: any) => {});
};
loadFriend();
const follow = () => {
	isActive.value = true;
};
const fan = () => {
	isActive.value = false;
};
</script>

<style scoped lang="less">
.friend {
	font-size: 1rem;
}
.selectors {
	height: 5%;

	.selector {
		display: flex;
	}

	ul {
		width: 10%;
		text-align: center;
		cursor: pointer;

		span {
			display: inline-block;
		}
	}

	.active {
		color: dodgerblue;
		span::after {
			content: "";
			display: block;
			width: 80%;
			height: 3px;
			background-color: dodgerblue;
			margin-top: 9px;
			transform: translateX(10%);
			position: relative;
			z-index: 1;
		}
	}
}
.selectors::after {
	content: "";
	display: block;
	width: 100%;
	height: 3px;
	background-color: aliceblue;
	margin-top: -3px;
	transform: translateX(0);
}

.content {
	height: 90%;
	width: 100%;
	margin-top: 3vh;
	display: flex;
	h2 {
		margin: 0 auto;
		text-align: center;
	}
	.list {
		width: 30%;
		margin-right: 3%;
		display: grid;
	}
	.detail {
		width: 100%;
		display: grid;
	}
}
</style>
