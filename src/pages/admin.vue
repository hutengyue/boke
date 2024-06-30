<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import {useRouter,useRoute} from 'vue-router';
import {ref} from 'vue'
const router = useRouter()
const path = ref(null)
function gotoPage(){
  router.push('/admin/')
}
function gotoUsers(){
  router.push('/admin/users')
}
function gotoPublic(){
  router.push('/admin/public')
}
function gotoLogs(){
  router.push('/admin/logs')
}
function gotoComments(){
  router.push('/admin/comments')
}
function gotoMessages(){
  router.push('/admin/messages')
}
function gotoArticles(){
  router.push('/admin/articles')
}
function gotoTags(){
  router.push('/admin/tags')
}
function gotoCategories(){
  router.push('/admin/categories')
}
</script>

<template>
  <div class="sidebar">
    <div class="title">
      <a style="color: white;font-size: 20px;font-weight: 700;">cavalry</a>
    </div>
    <el-menu
        active-text-color="white"
        background-color="#001529"
        active-background-color="#263445"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#bfcbd9"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>首页</span>
        </template>
        <el-menu-item class="menu-item" index="1-1" @click="gotoPage">分析页</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span>系统管理</span>
        </template>
        <el-menu-item class="menu-item" index="2-1" @click="gotoUsers">用户管理</el-menu-item>
        <el-menu-item class="menu-item" index="2-2" @click="gotoComments">评论管理</el-menu-item>
        <el-menu-item class="menu-item" index="2-3" @click="gotoMessages">留言管理</el-menu-item>
        <el-menu-item class="menu-item" index="2-4" @click="gotoLogs">日志管理</el-menu-item>
        <el-menu-item class="menu-item" index="2-5" @click="gotoTags">标签管理</el-menu-item>
        <el-menu-item class="menu-item" index="2-6" @click="gotoCategories">类别管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span>文章管理</span>
        </template>
        <el-menu-item class="menu-item" index="3-1" @click="gotoArticles()">文章列表</el-menu-item>
        <el-menu-item class="menu-item" index="3-2" @click="gotoPublic">文章发布</el-menu-item>
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

<style scoped>
.sidebar{
  position: fixed;
  top: 0;
  left: 0;
  width: 210px!important;
  height: 100%;
  overflow: hidden;
  background-color: #001529;;
}
.title{
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #001529;;
}
.menu-item{
  background-color: #0F2438;
}
.menu-item:active{
  background-color: rgb(64,158,255);
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