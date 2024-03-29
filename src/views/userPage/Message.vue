<template>
	<div class="message">
		<div class="main">
			<div class="tip">
				<span style="margin-left: 30%">
					<strong style="font-size: 1.5rem; margin-right: 2vw">tips:</strong>
					<span>点击消息左侧箭头即可查看消息内容</span>
				</span>
			</div>
			<el-table size="large" :data="tableData" table-layout="fixed">
				<el-table-column>
					<template #default="props">
						<el-badge :is-dot="props.row.messageIfRead === 0" style="margin-right: 1vw">
							<el-button size="small" @click="handleReaded(props.row.messageId)">标为已读</el-button>
						</el-badge>
						<el-button type="primary" size="small" @click="openDialog(props.row, $event)">查看详情</el-button>
					</template>
				</el-table-column>
				<el-table-column label="发送者">
					<template #default="props">
						{{ props.row.messageSenderName }}
					</template>
				</el-table-column>
				<el-table-column label="接收者">
					<template #default="props">
						{{ props.row.messageReceiverName }}
					</template>
				</el-table-column>
				<el-table-column label="发送时间">
					<template #default="props">
						{{ props.row.messageCreateTime }}
					</template>
				</el-table-column>
				<el-table-column>
					<template #default="props">
						<span style="color: red" v-if="props.row.messageIfRead === 0">未读</span
						><span style="color: dodgerblue" v-else>已读</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right">
					<template #default="props">
						<el-button size="small" type="danger" @click="handleDelete(props.row.messageId)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="pagination">
			<el-pagination
				style="justify-content: center"
				layout="prev, pager, next"
				:total="total"
				:page-size="pageSize"
				@prev-click="pageChange"
				@next-click="pageChange"
				@current-change="pageChange"
			/>
		</div>

		<el-dialog :show-close="false" v-model="dialogVisible" width="25%">
			<template #title>
				<p style="width: 100%; text-align: center">消息详情</p>
			</template>
			<div class="messageContent">
				<p>{{ showingMessageContent }}</p>
			</div>
			<el-input :rows="3" type="textarea" placeholder="请输入回复内容" v-model="newMessage.messageContent" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancelSendMessage">取消</el-button>
					<el-button type="primary" @click="sendMessage">发送</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
	import { ElMessage } from "element-plus";
	import { ref } from "vue";
	import { handleElButtonBlur } from "../../utils/handleButton";
	import request from "../../utils/request";

	const userId = sessionStorage.getItem("userId");

	let tableData: any = ref([]);

	//分页插件
	const pageNumber = ref(1);
	const pageSize = ref(8);
	const total = ref(0);
	const pageChange = (newPageNumber: number) => {
		pageNumber.value = newPageNumber;
		loadMessage();
	};

	//加载我收到的消息
	const loadMessage = () => {
		request
			.get("/message/sender/list", {
				params: {
					userId: userId,
					pageNumber: pageNumber.value,
					pageSize: pageSize.value,
				},
			})
			.then((res: any) => {
				tableData.value = res.data.rows;
				total.value = new Number(res.data.total).valueOf();
			});
	};
	loadMessage();

	//查看消息并回复
	const dialogVisible = ref(false);
	const showingMessageContent = ref("");
	const showingMessageSenderId = ref<number>();
	const newMessage: any = ref({});
	const openDialog = (row: any, e: Event) => {
		handleElButtonBlur(e);
		showingMessageContent.value = row.messageContent;
		showingMessageSenderId.value = row.messageSenderId;
		dialogVisible.value = true;
	};
	const cancelSendMessage = () => {
		dialogVisible.value = false;
		newMessage.value.messageContent = "";
	};
	const sendMessage = () => {
		newMessage.value.toId = showingMessageSenderId.value;
		const formData = new FormData();
		formData.append("toId", newMessage.value.toId);
		formData.append("messageContent", newMessage.value.messageContent);
		request.post("/message", formData).then((res: any) => {
			if (res.code === 200) {
				ElMessage({ type: "success", message: "回复成功" });
				loadMessage();
				dialogVisible.value = false;
				newMessage.value.messageContent = "";
			}
		});
	};
	const handleReaded = (messageId: number) => {
		request.put("message", { readMessageIds: [messageId] }).then((res: any) => {
			loadMessage();
		});
	};

	const handleDelete = (messageId: number) => {
		request.delete(`/message/${messageId}`).then((res: any) => {
			loadMessage();
		});
	};
</script>

<style scoped lang="less">
	.pagination {
		width: 100%;
	}
	.main {
		height: 86%;
	}
	.tip {
		margin-bottom: 1%;
		box-shadow: var(--el-box-shadow-light);
		border: 1px solid var(--el-card-border-color);
		border-radius: 5px;
		background-color: var(--el-card-bg-color);
		height: 8%;
		display: flex;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
	}

	.dialog-footer button:first-child {
		margin-right: 10px;
	}
	.messageContent {
		display: grid;
		align-items: center;
		min-height: 10vh;
		text-align: center;
		p {
			font-size: 1.25rem;
		}
	}
</style>
