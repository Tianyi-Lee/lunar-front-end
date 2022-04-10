<template>
	<div class="profile">
		<div class="top">
			<div class="left">
				<el-avatar
					style="margin: 0 2vw 0 0"
					:size="80"
					:src="userInfo.userAvatar"
				/>
				<el-divider direction="vertical" />
				<p style="margin: 0 2vw">{{ userInfo.userName }}</p>
				<el-divider direction="vertical" />
				<i
					v-if="userInfo.userGender === '男'"
					class="fa fa-mars"
					style="margin: 0 0 0 2vw; font-weight: 600"
					aria-hidden="true"
				></i>
				<i
					v-else-if="userInfo.userGender === '女'"
					class="fa fa-venus"
					style="margin: 0 0 0 2vw; font-weight: 600"
					aria-hidden="true"
				></i>
			</div>
			<div class="right">
				<ul>
					<p>我的关注</p>
					<span>{{ userInfo.userFollowNumber }}</span>
				</ul>
				<el-divider direction="vertical" />
				<ul>
					<p>我的粉丝</p>
					<span>{{ userInfo.userFansNumber }}</span>
				</ul>
				<el-divider direction="vertical" />
				<ul>
					<p>我的文章</p>
					<span>{{ userInfo.userArticleNumber }}</span>
				</ul>

				<el-button
					style="margin-left: 15vw"
					:icon="Edit"
					type="primary"
					@click="modifyInfo($event)"
					>修改个人资料</el-button
				>
			</div>
		</div>
		<div class="middle">
			<span style="margin: 0 2vw 0 3vw; font-size: 1.25rem; font-weight: 600"
				>个性签名:</span
			>{{ userInfo.userSignature }}
		</div>
		<el-divider content-position="center">*****</el-divider>
		<div class="bottom">
			<p style="font-size: 1.5rem">基本信息</p>
			<ul>
				<span>昵称</span
				>{{
					userInfo.userName
				}}
			</ul>
			<ul>
				<span>性别</span>
				{{
					userInfo.userGender
				}}
			</ul>
			<ul>
				<span>个人简介</span
				>{{
					userInfo.userProfile
				}}
			</ul>
			<ul>
				<span>所在地区</span
				>{{
					userInfo.userArea
				}}
			</ul>
			<ul>
				<span>出生日期</span
				>{{
					getBirthday
				}}
			</ul>
		</div>
		<el-dialog
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			:show-close="false"
			top="3vh"
			v-model="dialogVisible"
			center
			width="35%"
		>
			<template #title>
				<p style="font-size: 2rem">修改个人信息</p>
			</template>
			<div style="height: 60vh; overflow: auto">
				<el-scrollbar style="padding-right: 1%">
					<el-form :model="muserInfo" label-width="80px">
						<el-form-item label="昵称">
							<el-input v-model="muserInfo.userName" placeholder="请输入昵称" />
						</el-form-item>
						<el-form-item label="头像">
							<el-upload
								class="avatar-uploader"
								action="/api/upload"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload"
							>
								<img
									v-if="muserInfo.userAvatar"
									:src="muserInfo.userAvatar"
									class="avatar"
								/>
								<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
							</el-upload>
						</el-form-item>
						<el-form-item label="性别">
							<el-radio-group v-model="muserInfo.userGender">
								<el-radio-button label="男" />
								<el-radio-button label="女" />
							</el-radio-group>
						</el-form-item>
						<el-form-item label="出生时间">
							<el-date-picker
								v-model="muserInfo.userBirthday"
								type="date"
								placeholder="Pick a day"
								format="YYYY/MM/DD"
								value-format="YYYY-MM-DD"
							>
							</el-date-picker>
						</el-form-item>
						<el-form-item label="个性签名">
							<el-input
								v-model="muserInfo.userSignature"
								placeholder="请输入个性签名"
							/>
						</el-form-item>
						<el-form-item label="用户简介">
							<el-input
								v-model="muserInfo.userProfile"
								placeholder="请输入简介"
							/>
						</el-form-item>
						<el-form-item label="所在地区">
							<el-input
								v-model="muserInfo.userArea"
								placeholder="请输入所在地区"
							/>
						</el-form-item>
					</el-form>
				</el-scrollbar>
			</div>
			<template #footer>
				<el-button @click="save" type="primary">保存</el-button>
				<el-button @click="cancel">取消</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { Edit, Plus } from "@element-plus/icons-vue";
import { handleElButtonBlur } from "../../utils/handleButton";
import { ElMessage } from "element-plus";
import { ref, computed } from "vue";
import request from "../../utils/request";
import type { UploadProps } from "element-plus";
import { useUserInfoStore } from "../../stores/userInfo";

const dialogVisible = ref(false);
const userId = sessionStorage.getItem("userId");

const userInfo: any = ref({});
const muserInfo: any = ref({});

const loaduserInfo = () => {
	request.get(`/user/${userId}/detail`).then((res: any) => {
		userInfo.value = res.data;
		useUserInfoStore().setUserInfo({
			userName: res.data.userName,
			userAvatar: res.data.userAvatar,
			userLimit: res.data.userLimit,
		});
	});
};
loaduserInfo();
const getBirthday = computed(() => {
	if (typeof userInfo.value.userBirthday === "string")
		return userInfo.value.userBirthday.slice(0, 10);
});

//上传头像部分
const handleAvatarSuccess: UploadProps["onSuccess"] = (res, uploadFile) => {
	muserInfo.value.userAvatar = res.data.url;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
	if (rawFile.type !== "image/jpeg") {
		ElMessage.error("Avatar picture must be JPG format!");
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error("Avatar picture size can not exceed 2MB!");
		return false;
	}
	return true;
};
//--end--

const modifyInfo = (e: any) => {
	handleElButtonBlur(e);

	muserInfo.value = JSON.parse(JSON.stringify(userInfo.value));
	dialogVisible.value = true;
};

const cancel = () => {
	dialogVisible.value = false;
};

const save = () => {
	request.put(`/user/${userId}`, muserInfo.value).then((res: any) => {
		if (res.code == "200") {
			ElMessage({ type: "success", message: "修改成功!" });
			loaduserInfo();
		}
	});
	dialogVisible.value = false;
};
</script>

<style scoped lang="less">
.avatar-uploader .avatar {
	width: 100px;
	height: 100px;
	display: block;
}

// 以上为upload样式

.cell {
	height: 30px;
	padding: 3px 0;
	box-sizing: border-box;
}
.cell .text {
	width: 24px;
	height: 24px;
	display: block;
	margin: 0 auto;
	line-height: 24px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 50%;
}
.cell.current .text {
	background: purple;
	color: #fff;
}
.cell .holiday {
	position: absolute;
	width: 6px;
	height: 6px;
	background: red;
	border-radius: 50%;
	bottom: 0px;
	left: 50%;
	transform: translateX(-50%);
}

//以上为日期选择器样式
.profile {
	font-size: 1rem;
	.top {
		height: 15%;
		display: flex;
		.left {
			width: 30%;
			display: flex;
			align-items: center;
		}
		.right {
			width: 60%;
			margin-left: 10%;
			display: flex;
			align-items: center;
			ul {
				display: inline-block;
				margin: 0 2vw;
				text-align: center;
				cursor: pointer; //鼠标移至该元素时变成手
				p {
					font-weight: 600;
				}
				span {
					display: inline-block;
					margin: 1vh;
					font-size: 18px;
				}
			}
		}
	}
	.middle {
		height: 5%;
		margin: 2vh;
	}
	.bottom {
		margin-top: 2vh;
		height: 70%;
		ul {
			margin: 5vh;
			span {
				display: inline-block;
				width: 150px;
				text-align: center;
				font-size: 1rem;
				font-weight: 600;
			}
		}
	}
}
</style>
