<template>
	<div class="friend">
		<div class="selectors">
			<div class="selector">
				<ul :class="{ active: isActive === true }" @click="showFollow">
					<span>我的关注</span>
				</ul>
				<ul :class="{ active: isActive === false }" @click="showFan">
					<span>我的粉丝</span>
				</ul>
			</div>
		</div>
		<div class="content">
			<el-card class="detail">
				<h2>消息记录</h2>
				<el-divider></el-divider>
				<li v-if="currentRecords.length === 0">没有任何聊天记录</li>
				<div class="detail-content">
					<el-scrollbar ref="scrollbarRef" max-height="430px">
						<ul
							:class="[item.messageSenderId == userId ? myMsgUl : notMyMsgUl]"
							v-for="item in currentRecords"
						>
							<p id="messageCreateTime">{{ item.messageCreateTime }}</p>
							<p id="nameAndAvatar">
								<el-avatar
									v-if="item.messageSenderId == userId"
									:size="50"
									:src="myAvatar"
								></el-avatar>
								<el-avatar
									v-else
									:size="50"
									:src="currentUserAvatar"
								></el-avatar>
								<span>{{ item.messageSenderName }}</span>
							</p>
							
							<p style="display: flex;align-items: flex-end;">
								<p
								style="color: #67C23A;margin-right: 1%;width: 70px;"
								v-if="item.messageSenderId == userId"
								>
									<el-icon><check /></el-icon>已发送
								</p>
								<p id="messageContent">{{ item.messageContent }}</p>
								<p
								style="color: red; margin-left: 1%;width: 40px;"
								v-if="item.messageIfRead == 0 && item.messageSenderId != userId"
								>
								未读
								</p>
							</p>
							
							
						</ul>
						<div id="sendArea">
							<el-input
								@keyup.ctrl.enter="sendMessage()"
								type="textarea"
								:rows="5"
								v-model="sendAreaText"
								placeholder="请输入内容... 按下 `ctrl + 回车键`发送消息"
							/>
						</div>
					</el-scrollbar>
				</div>
			</el-card>
			<el-popover
				:offset="offset"
				v-model:visible="visible"
				width="250"
				placement="top"
				title="操作"
			>
				<template #reference>
					<el-card class="list">
						<h2 v-if="isActive">我的关注</h2>
						<h2 v-else>我的粉丝</h2>
						<el-divider />
						<div class="items">
							<ul
								@click="loadRecord(item.userId, item.userAvatar)"
								v-for="(item, index) in showingList"
								@click.right.prevent="operate(item.userId, index)"
							>
								<el-avatar :size="50" :src="item.userAvatar"></el-avatar>
								<p class="name">{{ item.userName }}</p>
								<div class="info">
									<div class="dot"></div>
									<p>在线</p>
								</div>
							</ul>
						</div>
					</el-card>
				</template>
				<div style="display: grid">
					<div style="display: flex">
						<el-button type="primary" @click="showUserDetail"
							>查看用户</el-button
						>
						<el-button type="danger" @click="cancelFollow">取关用户</el-button>
					</div>

					<el-button type="text" @click="cancel">取消</el-button>
				</div>
			</el-popover>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { nextTick, ref } from "vue";
import { useUserInfoStore } from "../../stores/userInfo";
import request from "../../utils/request";
import {Check} from '@element-plus/icons-vue'
const userId = sessionStorage.getItem("userId");
const myAvatar = ref(useUserInfoStore().getUserInfo.userAvatar);
const scrollbarRef:any = ref(null)

//定义展示的数据
const isActive = ref(true);
const showingList: any = ref([]);

//加载我的关注和粉丝列表
const followList: any = ref([]);
const followTotal = ref<number>();
const fanList: any = ref([]);
const fanTotal = ref<number>();
const loadFriend = () => {
	request
		.get(`/user/${userId}/follow/list`, {
			params: {
				pageNumber: 1,
				pageSize: 8,
			},
		})
		.then((res: any) => {
			followList.value = res.data.rows;
			if (isActive.value === true) {
				showingList.value = followList.value;
			}
			if (showingList.value[0])
				loadRecord(
					showingList.value[0].userId,
					showingList.value[0].userAvatar
				);
			followTotal.value = res.data.total;
		});
	request
		.get(`/user/${userId}/fan/list`, {
			params: {
				pageNumber: 1,
				pageSize: 8,
			},
		})
		.then((res: any) => {
			fanList.value = res.data.rows;
			if (isActive.value === false) {
				showingList.value = fanList.value;
			}
			if (showingList.value[0])
				loadRecord(
					showingList.value[0].userId,
					showingList.value[0].userAvatar
				);
			fanTotal.value = res.data.total;
		});
};
loadFriend();

//选择操作处理
const showFollow = () => {
	isActive.value = true;
	loadFriend();
};
const showFan = () => {
	isActive.value = false;
	loadFriend();
};

//处理聊天信息展示时列表的不同样式
const myMsgUl = ref("myMsgUl");
const notMyMsgUl = ref("notMyMsgUl");

//鼠标左键点击处理
//加载聊天记录
const currentRecords: any = ref([]);
const currentUserAvatar = ref("");
const currentUserId = ref<number>();
const loadRecord = (toId: number, UserAvatar: string) => {
	request
		.get("/message/list", {
			params: {
				userId: userId,
				toId: toId,
			},
		})
		.then((res: any) => {
			currentRecords.value.length = 0;
			res.data.forEach((e: any) => {
				currentRecords.value.unshift(e);
			});
			currentUserAvatar.value = UserAvatar;
			currentUserId.value = toId;
		});
};
if (showingList[0])
	loadRecord(showingList[0].userId, showingList[0].userAvatar);

//鼠标右键点击处理
const offset = ref(-90);
const visible = ref(false);
const operate = (userId: number, index: number) => {
	offset.value = -90;
	offset.value = offset.value - index * 69;
	visible.value = true;
};
const showUserDetail = () => {};
const cancelFollow = () => {};
const cancel = () => {
	visible.value = false;
};

//发送消息
const sendAreaText = ref("");
const sendMessage = () => {
	const formData = new FormData();
	if (currentUserId.value)
		formData.append("toId", new String(currentUserId.value).valueOf());
		formData.append("messageContent", sendAreaText.value);
	request.post("/message", formData).then((res: any) => {
		loadFriend();
		sendAreaText.value = "";
		ElMessage({ type: "success", message: "发送成功" });
		// nextTick(()=>{
		// 	if(scrollbarRef.value){
		// 		console.log(scrollbarRef.value);
		// 		scrollbarRef.value.wrap$.scrollTop = scrollbarRef.value.wrap$.scrollHeight+500
		// 	}
		// })
	});
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
		justify-content: right;
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
		width: 25%;
		margin-left: 3%;
		display: grid;
		.items {
			width: 100%;
			ul {
				cursor: pointer;
				display: grid;
				align-items: center;
				margin: 5%;
				grid-template-columns: 1fr 2fr 1fr;
				background-color: aliceblue;
				border-radius: 15px;
				padding: 8px;
				.name {
					justify-self: center;
				}
				.info{
					display: flex;
					align-items: center;
					margin-right: 2%;

					.dot{
						height: 5px;
						width: 5px;
						border: 1px solid #67C23A;
						border-radius: 50%;
						background-color: #67C23A;
						margin-right: 10%;
					}
					p{
						color: #67C23A;
					}
				}
			}
		}
	}
	.detail {
		height: 100%;
		width: 100%;
		display: grid;
		li {
			align-self: center;
			list-style: none;
		}
		.detail-content {
			height: 100%;
			ul {
				width: 94%;
				margin: 2%;

				#messageCreateTime {
					justify-self: center;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 10px;
					border: 1px solid rgba(0, 0, 0, 0.1);
				}
				#messageContent {
					background-color: aliceblue;
					width: 500px;
					border: 1px solid aliceblue;
					border-radius: 10px;
					padding: 10px;
					white-space: normal;
				}
			}
			#sendArea {
				width: 96%;
			}
		}
		.myMsgUl {
			display: grid;
			justify-items: right;
		}
		.notMyMsgUl {
			display: grid;
			justify-items: left;
		}
	}
}
</style>
