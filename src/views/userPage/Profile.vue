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
          style="margin: 0 0 0 2vw"
          aria-hidden="true"
        ></i>
        <i
          v-else-if="userInfo.userGender === '女'"
          class="fa fa-venus"
          style="margin: 0 0 0 2vw"
          aria-hidden="true"
        ></i>
      </div>
      <div class="right">
        <ul>
          我的关注<br /><span>{{ userInfo.userFollowNumber }}</span>
        </ul>
        <el-divider direction="vertical" />
        <ul>
          我的粉丝<br /><span>{{ userInfo.userFansNumber }}</span>
        </ul>
        <el-divider direction="vertical" />
        <ul>
          我的文章<br /><span>{{ userInfo.userArticleNumber }}</span>
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
      <span style="margin: 0 2vw 0 0">个性签名:</span
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
          userInfo.userBirthday
        }}
      </ul>
    </div>
    <el-dialog top="3vh" v-model="dialogVisible" center width="35%">
      <template #title>
        <p style="font-size: 2rem">修改个人信息</p>
      </template>
      <div style="height: 66vh; overflow: auto">
        <el-scrollbar style="padding-right: 1%">
          <el-form :model="muserInfo" label-width="80px">
            <el-form-item label="昵称">
              <el-input v-model="muserInfo.userName" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="密码"> </el-form-item>
            <el-form-item label="头像"> </el-form-item>
            <el-form-item label="性别"> </el-form-item>
            <el-form-item label="出生时间"> </el-form-item>
            <el-form-item label="个性签名"> </el-form-item>
            <el-form-item label="用户简介"> </el-form-item>
            <el-form-item label="所在地址"> </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <template #footer>
        <el-button type="primary">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { Edit } from "@element-plus/icons-vue";
import { handleElButtonBlur } from "../../utils/handleButton";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import request from "../../utils/request";

const dialogVisible = ref(false);
const userId = sessionStorage.getItem("userId");

const userInfo: any = ref({});
const muserInfo: any = ref({});

const loaduserInfo = () => {
  request.get(`/user/${userId}/detail`).then((res: any) => {
    userInfo.value = res.data;
  });
};
loaduserInfo();

const modifyInfo = (e: any) => {
  handleElButtonBlur(e);
  dialogVisible.value = true;
};
</script>

<style scoped lang="less">
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
        span {
          display: inline-block;
          margin: 1vh;
          font-size: 1.5rem;
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
        text-align: left;
        font-size: 1rem;
      }
    }
  }
}
</style>
