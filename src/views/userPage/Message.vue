<template>
	<div class="message">
		<el-table size="large" :show-header="false" :data="tableData">
			<el-table-column width="180px">
				<template #default="scope">
					<el-badge is-dot style="margin-right: 1vw"
						><el-button
							type="primary"
							size="small"
							@click="handleShow(scope.row)"
							>查看</el-button
						>
					</el-badge>
					<el-button size="small" @click="handleReaded(scope.row)"
						>标为已读</el-button
					></template
				>
			</el-table-column>
			<el-table-column prop="msg"> </el-table-column>
			<el-table-column fixed="right" width="70px">
				<template #default="scope">
					<el-button size="small" type="danger" @click="handleDelete(scope.row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import request from "../../utils/request";
let tableData: any = reactive([
	{
		msg: "一条新消息...",
	},
	{
		msg: "二条新消息...",
	},
]);
const loadMessage = () => {
	request
		.get("/message/sender/list", {
			params: {
				pageNumber: 1,
				pageSize: 8,
			},
		})
		.then((res: any) => {
			console.log(res);
			console.log("消息加载成功!");
		});
};
loadMessage();
const handleReaded = (row: any) => {};

const handleDelete = (row: any) => {};

const handleShow = (row: any) => {};
</script>

<style scoped>
.message {
	font-size: 1.5rem;
}
</style>
