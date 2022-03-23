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
        <ul @click="show()">
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

        <el-button style="margin-left: 15vw" type="primary"
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
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import request from "../../utils/request";

const userId = sessionStorage.getItem("userId");

const userInfo: any = ref({
  name: "",
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  gender: "男",
  profile: "这是个人简介...",
  signature: "这是个性签名...",
  birthday: "2022-03-22",
  area: "西北大学",
});

const loaduserInfo = () => {
  request.get(`/user/${userId}/detail`).then((res: any) => {
    userInfo.value = res.data;
  });
};
loaduserInfo();
const show = () => {
  ElMessage({
    type: "success",
    message: "hello",
  });
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
