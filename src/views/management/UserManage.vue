<template>
  <div class="usermanage">
    <div class="function">
      <el-button @click="add" type="primary" style="margin-right: 2vw"
        >新增</el-button
      >
      <el-input
        v-model="searchContent"
        placeholder="请输入电话号码关键字"
        style="width: 250px; margin-right: 1vw"
        clearable
      />
      <el-button type="primary" @click="load">按电话号码查询</el-button>
    </div>
    <el-table :data="tableData" border style="width: 98%" size="default">
      <el-table-column width="120" prop="userTel" label="电话" />
      <el-table-column width="120" prop="userNickName" label="昵称" />
      <el-table-column width="180" prop="userPassword" label="密码" />
      <el-table-column width="80" sortable prop="userGender" label="性别" />
      <el-table-column prop="userRegisterTime" label="注册时间" />
      <el-table-column prop="userSignature" label="个性签名" />
      <el-table-column prop="userArea" label="所在地区" />
      <el-table-column sortable prop="userPermission" label="用户身份" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-popconfirm
            title="确定要删除吗(此操作不可逆)?"
            confirm-button-text="确定"
            cancel-button-text="别,再等等"
            @confirm="handleDelete(scope.row.userId)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <el-dialog
        v-model="dialogVisible"
        title="新增用户"
        width="30%"
        top="10vh"
      >
        <el-form
          label-position="right"
          label-width="80px"
          :model="userinfo"
          size="normal"
        >
          <el-form-item label="手机号:" required>
            <el-input
              v-model="userinfo.userTel"
              placeholder="您的手机号"
              clearable
            />
          </el-form-item>
          <el-form-item label="昵称:" required>
            <el-input
              v-model="userinfo.userNickName"
              placeholder="您喜欢的昵称"
            />
          </el-form-item>
          <el-form-item label="密码:" required>
            <el-input v-model="userinfo.userPassword" placeholder="您的密码" />
          </el-form-item>
          <el-form-item label="性别:" required>
            <el-radio v-model="userinfo.userGender" label="男" size="large"
              >男</el-radio
            >
            <el-radio v-model="userinfo.userGender" label="女" size="large"
              >女</el-radio
            >
            <el-radio v-model="userinfo.userGender" label="未知" size="large"
              >未知</el-radio
            >
          </el-form-item>
          <el-form-item label="个性签名:">
            <el-input
              type="textarea"
              v-model="userinfo.userSignature"
              placeholder="您的个性签名"
              autosize
            />
          </el-form-item>
          <el-form-item label="地区:">
            <el-input
              type="textarea"
              v-model="userinfo.userArea"
              placeholder="您所在的地区"
              autosize
            />
          </el-form-item>
          <el-form-item label="权限:" required>
            <el-radio
              v-model="userinfo.userPermission"
              label="普通用户"
              size="large"
              >普通用户</el-radio
            >
            <el-radio
              v-model="userinfo.userPermission"
              label="管理员"
              size="large"
              >管理员</el-radio
            >
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import request from "../../utils/request";
import FDate from "../../utils/FormatedDate";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { handleElButtonBlur } from "../../utils/handleButton";

let tableData = ref([]);
let searchContent = ref("");
let currentPage = ref(1);
let pageSize = ref(8);
let total = ref(0);
let dialogVisible = ref(false);
let userinfo: any = ref({
  userTel: "",
  userNickName: "",
  userPassword: "",
  userGender: "",
  userSignature: "",
  userArea: "",
  userPermission: "",
  userRegisterTime: "",
});

function load() {
  request
    .get("/user", {
      params: {
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        searchContent: searchContent.value,
      },
    })
    .then((res) => {
      tableData.value = res.data.records;
      total.value = res.data.total;
    });
}
function handleUpdate(row: object) {
  userinfo.value = JSON.parse(JSON.stringify(row));
  dialogVisible.value = true;
}
function handleDelete(userId: number) {
  request.delete("/user/" + userId).then((res: any) => {
    if (res.code === "0") {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      load();
    } else
      ElMessage({
        type: "error",
        message: res.msg,
      });
  });
}
function handleCurrentChange(changedPageNum: number) {
  currentPage.value = changedPageNum;
  load();
}
function add(e: any) {
  handleElButtonBlur(e);
  userinfo.value = {
    userTel: "",
    userNickName: "",
    userPassword: "",
    userGender: "",
    userSignature: "",
    userArea: "",
    userPermission: "",
    userRegisterTime: "",
  };
  dialogVisible.value = true;
}
function save() {
  if ("userId" in userinfo.value) {
    request.put("/user", userinfo.value).then((res: any) => {
      if (res.code === "0") {
        ElMessage({
          type: "success",
          message: "更新成功",
        });
      } else
        ElMessage({
          type: "error",
          message: res.msg,
        });

      load();
      dialogVisible.value = false;
    });
  } else {
    userinfo.value.userRegisterTime = new FDate().format("yyyy-MM-dd hh:mm:ss");
    request.post("/user", userinfo.value).then((res: any) => {
      if (res.code === "0") {
        ElMessage({
          type: "success",
          message: "新增成功",
        });
      } else
        ElMessage({
          type: "error",
          message: res.msg,
        });
      load();
      dialogVisible.value = false;
    });
  }
}

// load();
</script>

<style scoped lang="less">
@fontSize: 16px;
.usermanage {
  font-size: 1.5 * @fontSize;
  width: 100%;
}

.function {
  display: flex;
  margin-bottom: 1vh;
}
.pagination {
  margin-top: 1vh;
  display: flex;
  justify-content: center;
}
</style>
