<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import {useRouter,useRoute} from 'vue-router';
import {ref} from 'vue'
const router = useRouter()
const route = useRoute()
const path = ref(null)
function gotoUsers(){
  router.push('/admin/users')
}
function gotoPublic(){
  router.push('/admin/public')
}
</script>

<template>
  <div class="sidebar">
    <div class="title">
      <a style="color: white;font-size: 20px;font-weight: 700;">cavalry</a>
    </div>
    <el-menu
        active-text-color="#409eff"
        background-color="#304156"
        active-background-color="#263445"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
    >
      <el-menu-item index="1">
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <span>系统管理</span>
        </template>
        <el-menu-item index="2-1" @click="gotoUsers">用户管理</el-menu-item>
        <el-menu-item index="2-2" >评论管理</el-menu-item>
        <el-menu-item index="2-3">留言管理</el-menu-item>
        <el-menu-item index="2-4" @click="router.push('/admin/logs')">日志管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span>文章管理</span>
        </template>
        <el-menu-item index="3-1">文章列表</el-menu-item>
        <el-menu-item index="3-2" @click="gotoPublic">文章发布</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="4">
        <template #title>
          <span>常用组件</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
  <div class="container">
    <div class="device">
      <div class="navbar">
      </div>
      <div class="tags">

      </div>
    </div>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style>
*{
  font-family:  Helvetica, sans-serif;
}
.sidebar{
  position: fixed;
  top: 0;
  left: 0;
  width: 210px!important;
  height: 100%;
  overflow: hidden;
  background-color: #304156;
}
.title{
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(31,41,55);
}
.el-menu-vertical-demo{
  font-size: 20px;
  border-right-width: 0;
}
.container{
  margin-left: 210px;
}
.device{
}
.navbar{
  height: 50px;
  border-bottom: 1px solid rgb(228,231,237);
}
.tags{
  height: 34px;border-bottom: 1px solid rgb(228,231,237);
}
.main{
  margin-left: 210px;
  height: calc(100vh - 84px);
  background-color: rgb(242,243,245);
}
</style>