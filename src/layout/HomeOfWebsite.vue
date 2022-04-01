<template>
  <!-- 这是整个网站的首页 -->
  <div class="home">
    <div class="header">
      <div class="left animate__animated animate__zoomIn">
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
      <div class="main-left">
        <div class="main-left-content">
          <el-carousel style="height: 510px" direction="vertical">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="main-right">
        <el-card id="card">
          <el-scrollbar height="480px">
            <div
              v-for="(item, index) in blogItems"
              :key="item.blogId"
              class="scrollbar-demo-item"
              style="
                align-items: flex-start;
                justify-content: left;
                text-align: left;
              "
              type="text"
              @click="show(item, index)"
            >
              <div class="itemClass">
                <p>{{ `博客标题:${item.blogTitle}` }}</p>
                <p>{{ `博客作者:${item.blogAuthorName}` }}</p>
                <p>
                  博客标签:<el-tag
                    class="ml-2 tag"
                    effect="dark"
                    v-for="tag in item.blogTags"
                    >{{ tag }}</el-tag
                  >
                </p>
                <p style="padding-left: 30px">{{ `${item.blogDigest}` }}</p>
              </div>
            </div>

            <el-dialog
              top="10vh"
              width="80%"
              :center="true"
              v-model="dialogVisible"
              :title="currentBlog.blogTitle"
            >
              <div class="myDialogClass">
                <div ref="lbtnRef" class="aside">
                  <el-tooltip content="上一篇" placement="right">
                    <el-button
                      type="primary"
                      :icon="ArrowLeftBold"
                      circle
                      @click="last()"
                    />
                  </el-tooltip>
                </div>
                <div style="width: 90%; height: 100%">
                  <p v-html="currentBlog.blogDigest"></p>
                </div>
                <div ref="rbtnRef" class="aside">
                  <el-tooltip content="下一篇" placement="left">
                    <el-button
                      type="primary"
                      :icon="ArrowRightBold"
                      circle
                      @click="next()"
                    />
                  </el-tooltip>
                </div>
              </div>
            </el-dialog>
          </el-scrollbar>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

let blogItems = [
  {
    blogId: 1,
    blogAuthorName: "海绵宝宝",
    blogTitle: "Java",
    blogDigest: "精通Java",
    blogCreateTime: "2022-03-18",
    blogTags: ["学习", "分享", "经验"],
  },
  {
    blogId: 2,
    blogAuthorName: "派大星",
    blogTitle: "c++",
    blogDigest: "精通c++",
    blogCreateTime: "2022-03-18",
    blogTags: ["学习", "分享", "经验"],
  },
  {
    blogId: 3,
    blogAuthorName: "李四",
    blogTitle: "python",
    blogDigest: "精通python",
    blogCreateTime: "2022-03-18",
    blogTags: ["学习", "分享", "经验"],
  },
  {
    blogId: 4,
    blogAuthorName: "王五",
    blogTitle: "学习学个屁",
    blogDigest: "学习学个屁",
    blogCreateTime: "2022-03-18",
    blogTags: ["学习", "分享", "经验"],
  },
  {
    blogId: 5,
    blogAuthorName: "老六",
    blogTitle: "哈哈哈哈",
    blogDigest: "哈哈哈",
    blogCreateTime: "2022-03-18",
    blogTags: ["学习", "分享", "经验"],
  },
];

let dialogVisible = ref(false);

let currentBlog: any = ref({});
let currentIndex: number;

const show = (selectedBlog: any, index: number) => {
  currentBlog.value = selectedBlog;
  currentIndex = index;
  dialogVisible.value = true;
};
const last = () => {
  if (currentIndex === 0) {
    ElMessage({
      type: "warning",
      message: "已经是第一个了",
    });
    return;
  } else {
    currentIndex--;
    currentBlog.value = blogItems[currentIndex];
  }
};
const next = () => {
  if (currentIndex === blogItems.length - 1) {
    ElMessage({
      type: "warning",
      message: "已经是最后一个了",
    });
    return;
  } else {
    currentIndex++;
    currentBlog.value = blogItems[currentIndex];
  }
};
</script>

<style scoped lang="less">
.itemClass {
  color: black;
  cursor: pointer;
  p {
    margin: 15px;
    .tag {
      margin: 0 15px;
    }
  }
}
.myDialogClass {
  height: 70vh;
  display: flex;
  .aside {
    width: 5%;
    height: 100%;
    display: grid;
    place-items: center;
  }
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 98%;
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
      width: 250px;
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
        font-size: 1.5rem;
      }
    }
  }

  .main {
    display: flex;
    height: calc(100vh - 10vh);
    @leftWidth: 300px;

    .main-left {
      width: @leftWidth;

      padding: 60px 0px;
      .main-left-content {
        height: 100%;
        margin-left: 20%;
        padding: 1vh;
        width: 80%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }

    .main-right {
      width: calc(100vw - @leftWidth);
      padding: 60px 60px;

      #card {
        height: 100%;
      }
    }
  }
}

.el-carousel__item {
  min-height: 510px;

  h3 {
    color: #475669;
    font-size: 1.5rem;
    opacity: 0.75;
    line-height: 510px;
    margin: 0;
    text-align: center;
  }
}
.el-carousel__item:nth-child(2n) {
  background: #ecf5ff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #bcd5f1;
}
</style>
