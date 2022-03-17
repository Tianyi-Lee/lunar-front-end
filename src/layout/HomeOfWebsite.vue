<template>
  <!-- 这是整个网站的首页 -->
  <div class="home">
    <div class="header">
      <div class="left">
        <img src="../assets/images/websitelogo.svg" alt="logo" />
        <p>Lunar</p>
      </div>
      <div class="center"></div>
      <div class="right">
        <el-button type="text" @click="$router.push('/login')"
          ><p>登录/注册</p></el-button
        >
      </div>
    </div>
    <div class="main">
      <div class="main-left"></div>
      <div class="main-right">
        <el-card id="card">
          <el-scrollbar height="500px">
            <el-button
              v-for="item in 20"
              :key="item"
              class="scrollbar-demo-item"
              type="text"
              @click="show()"
              >{{ item }}</el-button
            >
          </el-scrollbar>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const show = () => {
  alert("展开");
};
</script>

<style scoped lang="less">
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 99%;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.home {
  height: 100vh;
  width: 100vw;

  .header {
    width: 100%;
    height: 10vh;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    line-height: 10vh;
    display: flex;
    .left {
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 2rem;
        margin-left: 15px;
        color: dodgerblue;
      }
    }
    .center {
      flex: 1;
    }
    .right {
      width: 15vw;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 2rem;
      }
    }
  }

  .main {
    display: flex;
    height: calc(100vh - 10vh);

    .main-left {
      width: 200px;
    }

    .main-right {
      width: calc(100vw - 200px);
      padding: 60px 90px;

      #card {
        height: 100%;
      }
    }
  }
}
</style>
