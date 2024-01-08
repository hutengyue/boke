<template>
  <div class="sidebar">
    <div class="title">
      <a style="color: white;font-size: 20px;font-weight: 700;">cavalry</a>
    </div>
    <el-menu
        active-text-color="#409eff"
        background-color="#304156"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
    >
      <el-menu-item index="1">
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3">
        <span>文章管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>留言管理</span>
      </el-menu-item>
    </el-menu>
  </div>
  <div class="container">
    <div class="device">
      <div class="navbar"></div>
      <div class="tags"></div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
*{
  font-family: "黑体";
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
  background-color: black;
  height: 100%;
  margin-left: 210px;
}
.device{
}
.navbar{
  height: 50px;
}
.tags{
  height: 34px;
}
</style>