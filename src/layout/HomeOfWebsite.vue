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
          <el-carousel style="height: 530px" direction="vertical">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="main-right">
        <div id="card">
          <el-scrollbar>
            <div
              v-for="(item, index) in blogItems"
              :key="item.blogId"
              class="scrollbar-demo-item"
              type="text"
              @click="show(item, index)"
            >
              <div class="itemClass">
                <p style="font-size: 2rem">{{ item.blogTitle }}</p>

                <p>
                  <i class="fa fa-user" aria-hidden="true"></i
                  >{{ item.blogAuthorName }}
                  <i
                    style="margin-left: 2vw"
                    class="fa fa-clock-o"
                    aria-hidden="true"
                  ></i
                  >{{ `创建时间` }}
                </p>

                <p>
                  <i class="fa fa-tags" aria-hidden="true"></i
                  ><el-tag
                    style="margin-right: 1vw"
                    class="ml-2 tag"
                    effect="dark"
                    v-for="tag in item.blogTags"
                    >{{ tag }}</el-tag
                  >
                </p>
                <p style="padding-left: 30px">{{ `${item.blogDigest}` }}</p>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <el-dialog
      custom-class="theFuckingDialogClass"
      :show-close="false"
      top="3vh"
      v-model="dialogVisible"
      center
      width="80%"
    >
      <template #title>
        <p style="font-size: 2rem; font-weight: 500">
          {{ currentBlog.blogTitle }}
        </p>
      </template>

      <div style="height: 77vh; overflow: auto">
        <el-scrollbar style="padding-right: 1%">
          <Editor
            codeStyle="monokai"
            fontSize="18px"
            :html="false"
            style="height: 100%; width: 100%; min-height: 74vh"
          />
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
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

      padding: 50px 0px;
      .main-left-content {
        border-radius: 15px;
        height: 100%;
        margin-left: 20%;
        padding: 10px;
        width: 80%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }

    .main-right {
      width: calc(100vw - @leftWidth);
      padding: 50px 50px;

      #card {
        height: 100%;
        box-shadow: var(--el-box-shadow-light);
        padding: 5px;
        border-radius: 15px;
        .scrollbar-demo-item {
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          justify-content: left;
          width: 98%;
          margin: 10px;
          text-align: left;
          border-radius: 15px;
          background: var(--el-color-primary-light-9);
          color: var(--el-color-primary);
          .itemClass {
            color: black;

            p {
              margin: 2vh;

              i {
                margin-right: 1vw;
              }
            }
            p:hover {
              color: dodgerblue;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}

.el-carousel__item {
  min-height: 530px;

  h3 {
    color: #475669;
    font-size: 1.5rem;
    opacity: 0.75;
    line-height: 530px;
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
