<template>
	<div class="message">
		<el-table
			size="large"
			:show-header="false"
			:data="tableData"
			table-layout="fixed"
		>
			<el-table-column type="expand">
				<template #default="props">
					<span>{{ props.row.msg }}</span>
				</template>
			</el-table-column>
			<el-table-column>
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
			<el-table-column>
				<template #default="scope"> 发送人 </template>
			</el-table-column>
			<el-table-column>
				<template #default="scope"> 2019-07-14 20:00:00 </template>
			</el-table-column>
			<el-table-column fixed="right">
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
import { ref } from "vue";
import request from "../../utils/request";
let tableData: any = ref([
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
		.then((res: any) => {});
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
