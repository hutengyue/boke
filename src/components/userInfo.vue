<template>
  <div class="all">
    <div class="userBox" v-if="user">
      <img @click="data.centerDialogVisible = true" :src="user.headImg">
      <div class="userInfo">
        <div class="userName">
          <a>用户名：</a><input v-model="user.username" maxlength="10" type="text"/>
        </div>
        <div class="email">
          <a>邮箱：</a>{{user.email}}
        </div>
        <div class="sex">
          <a>性别：</a>
          <el-radio v-model="user.sex" label="1">男</el-radio>
          <el-radio v-model="user.sex" label="2">女</el-radio>
        </div>
        <div class="introdu">
          <a>简介：</a><el-input
            type="textarea"
            maxlength="30"
            show-word-limit
            placeholder="请输入内容"
            v-model="user.introduction">
        </el-input>
        </div>
      </div>
      <button class="button" @click="submit">提交</button>
      <button class="exit" @click="exit">退出登录</button>
      <button class="admin" @click="gotoAdmin()">进入后台</button>
    </div>

    <el-dialog
        title="头像上传"
        v-model="data.centerDialogVisible"
        width="350px"
        top="22vh"
        :align-center="true" >
      <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          drag
          name="file"
          :headers="data.headers"
          :before-upload="beforeAvatarUpload">
        <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar">
        <div v-else>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reviseImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import {getCurrentInstance, reactive, toRef,onMounted} from "vue";
import { uploadToOSS } from "../util/api.js";
import useStore from "../store/index.js";
import {useRouter} from "vue-router";
const props = defineProps({
  user:Object
})
const user = toRef(props,'user')
const {proxy} = getCurrentInstance()
const store = useStore()
const router = useRouter()
const data = reactive({
  headers: {enctype: "multipart/form-data"},
  centerDialogVisible: false,
  imageUrl: '',
  fileInfo: '',
  ossConfig:null
});

async function beforeAvatarUpload(file) {
  const isJPG = file.type === 'image/jpeg' || 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG或PNG 格式!')
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
    return false;
  }

  try {
    const url = await uploadToOSS(file);
    data.fileInfo = url;
    // console.log(data.fileInfo)
    data.imageUrl = URL.createObjectURL(file);
    ElMessage.success('上传成功');
    return false; // 返回false阻止Element默认上传
  } catch (error) {
    ElMessage.error('上传失败');
    console.error(error);
    return false;
  }
}
function reviseImg(){
  data.centerDialogVisible = false;
  if(data.fileInfo) {
    user.value.headImg = data.fileInfo;
  }
}

function submit(){
  if(user.value.username === "") {
    ElMessage.warning('用户名不能为空');
    return;
  }
  if(data.fileInfo) {
    user.value.headImg = data.fileInfo;
  }
  // console.log(user.value);
  proxy.$http({
    url: '/user/update',
    method: "POST",
    data: { user: user.value }
  }).then(res => {
    // 提交成功后清空临时文件信息
    data.fileInfo = '';
    return ElMessage({
      message: res.data.msg,
      type: res.data.type
    });
  });
}
function exit(){
  store.delIdenttity()
  store.delToken()
  store.delHeadImg()
  store.delUsername()
  router.go(0)
}
function gotoAdmin(){
  router.push('/admin/analysis')
}
</script>

<style scoped>
@keyframes zhuye {
  from{
    opacity: 0;
    transform: translate(0px,-50px);
  }
  to{
    opacity: 1;
    transform: translate(0px,0px);
  }
}
.all{
  position: relative;
  align-items: center;
  background: #e9e9e9 url("../assets/image/user.jpg") no-repeat fixed center;
  background-size: cover;
  display: grid;
  height: 100vh;
  width: 100%;
  place-items: center;
  animation: zhuye 1s ease 0s 1 normal none running;
}
.userBox{
  background-color: rgb(255,255,255,0.1);
  border-radius: 0.7rem;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
  0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: 700px;
  max-width: 800px;
  overflow: hidden;
  position: relative;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
}
.userBox img{
  border-radius: 100%;
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.userInfo{
  margin-right: 30px;
}
.userName,.email,.sex,.introdu{
  margin-top: 30px;
  color: white;
  font-size: 20px;
}
.userName input{
  background-color: rgb(255,255,255,0.5);
  border: none;
  font-size: 20px;
  padding: 10px;
  outline: none;
  border-radius: 10px;
  color: rgb(0,0,0,0.6);
}
.button{
  color: white;
  font-size: 20px;
  margin-top: 40px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: darkviolet;
}
.exit{
  position: absolute;
  top: 0;
  left: 80%;
  color: white;
  font-size: 20px;
  margin-top: 40px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: darkviolet;
}
.admin{
  position: absolute;
  top: 0;
  right: 80%;
  color: white;
  font-size: 20px;
  margin-top: 40px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: darkviolet;
}


/*表单*/
:deep(.el-radio__label){
  font-size: 20px;
  font-family: rain;
  color: white;
}
:deep(.el-radio__inner){
  height: 18px;
  width: 18px;
}
:deep(.el-radio__input.is-checked .el-radio__inner){
  background: darkviolet;
  border-color: darkviolet;
}
:deep(.el-radio__input.is-checked+.el-radio__label){
  color: darkviolet;
}
:deep(.el-radio__inner::after){
  height: 8px;
  width: 8px;
}
:deep(.el-textarea){
  margin-top: 10px;
}
:deep(.el-textarea__inner){
  background-color: rgb(255,255,255,0.5);
  font-size: 18px;
  user-select: none;
}
:deep(.el-input__count){
  background-color: transparent;
  font-size: 15px;
}




:deep(.avatar-uploader){
  width: 300px;
  margin: 0 auto;
}
:deep(.el-upload-dragger){
  width: 300px;
}
:deep(.dialog-footer){
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.avatar{
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>