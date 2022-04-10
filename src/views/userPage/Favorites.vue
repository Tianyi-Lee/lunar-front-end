<template>
	<div class="favorites">
		<el-card class="left">
			<p style="text-align: center">收藏夹</p>
			<el-divider content-position="center">***</el-divider>
			<el-button-group size="large" class="btng">
				<el-button class="btn">默认收藏夹</el-button>
				<el-button class="btn">海绵宝宝</el-button>
				<el-button class="btn">喜羊羊</el-button>
				<el-button class="btn">灰太狼</el-button>
			</el-button-group>
		</el-card>
		<el-card class="right">
			<p style="text-align: center">收藏夹内容</p>
			<el-divider content-position="center">***</el-divider>
			<ul v-for="item in 5">
				{{
					`第${item}条内容`
				}}
			</ul>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import request from "../../utils/request";
const userId = sessionStorage.getItem("userId");

request
	.get("/folder/list", {
		params: {
			userId: userId,
			pageNumber: 1,
			pageSize: 8,
		},
	})
	.then((res: any) => {});
</script>

<style scoped lang="less">
.favorites {
	font-size: 1.5rem;
	display: flex;
	.left {
		width: 180px;
		height: 94%;
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
		height: 94%;
		margin-left: 2vw;
		ul {
			background-color: aliceblue;
			width: 100%;
			margin: 1vh auto;
		}
	}
}
</style>
