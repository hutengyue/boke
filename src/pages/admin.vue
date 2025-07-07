<script setup>
import { ref, computed,watch ,onMounted,getCurrentInstance} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Fold, Expand, FullScreen, CaretBottom, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import useStore from "../store/index.js";

const store = useStore()
const route = useRoute()
const router = useRouter()
const isCollapse = ref(false)
const activeMenu = ref(route.path)
const visitedViews = ref([])
const {proxy} = getCurrentInstance()


// 动态路由配置
const routes = computed(() => {
  const allRoutes = router.getRoutes()
  const adminRoute = allRoutes.find(r => r.path === '/admin')
  if (!adminRoute) return []

  return adminRoute.children.map(route => ({
    path: `/admin/${route.path}`,
    name: route.meta?.title,  // 使用 meta.title 替代 name
    icon: route.meta?.icon,
    children: route.children?.map(child => ({
      path: `/admin/${route.path}/${child.path}`,
      name: child.meta?.title,  // 使用 meta.title 替代 name
      icon: child.meta?.icon
    })) || []
  }))
})
// 面包屑导航
const breadcrumb = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  return matched
})

// 添加标签页
const addVisitedView = (view) => {
  if (visitedViews.value.some(v => v.path === view.path)) return
  visitedViews.value.push({
    name: view.meta?.title || view.name,  // 使用 meta.title
    path: view.path,
    meta: view.meta  // 添加 meta 信息
  })
}

// 关闭标签页
const closeSelectedTag = (view) => {
  const index = visitedViews.value.findIndex(v => v.path === view.path)
  visitedViews.value.splice(index, 1)
  if (view.path === route.path) {
    const lastView = visitedViews.value[visitedViews.value.length - 1]
    if (lastView) {
      router.push(lastView.path)
    } else {
      router.push('/')
    }
  }
}
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const handleLogout = () => {
  router.push('/user')
}
const handleCommand = (command) => {
  switch (command) {
    case 'exit':
      store.delIdenttity()
      store.delToken()
      store.delHeadImg()
      store.delUsername()
      router.push('/user')
      break
  }
}
// 监听路由变化
watch(route, (to) => {
  if (to.name) {
    addVisitedView(to)
  }
}, { immediate: true })

onMounted(()=>{
  proxy.$http.get('/user').then(res => {
  })
})
</script>

<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ 'is-collapse': isCollapse }">
      <div class="logo">
        <span v-show="!isCollapse">Cavalry</span>
        <div class="sidebar-toggle" @click="isCollapse = !isCollapse">
          <el-icon><component :is="isCollapse ? Expand : Fold"/></el-icon>
        </div>
      </div>
      <el-menu
          :collapse="isCollapse"
          :default-active="activeMenu"
          background-color="#001529"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          unique-opened
      >
      <template v-for="route in routes" :key="route.path">
        <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
          <template #title>
            <el-icon><component :is="ElementPlusIconsVue[route.icon]"/></el-icon>
            <span>{{ route.name }}</span>
          </template>
          <el-menu-item 
            v-for="child in route.children" 
            :key="child.path" 
            :index="child.path"
            @click="router.push(child.path)"
          >
            <el-icon><component :is="ElementPlusIconsVue[child.icon]"/></el-icon>
            <span>{{ child.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item 
          v-else 
          :index="route.path"
          @click="router.push(route.path)" 
        >
          <el-icon><component :is="ElementPlusIconsVue[route.icon]"/></el-icon>
          <span>{{ route.name }}</span>
        </el-menu-item>
      </template>
      </el-menu>
    </div>

    <!-- 主要内容区 -->
    <div class="main-container" :class="{ 'is-collapse': isCollapse }">
      <!-- 导航栏 -->
      <div class="navbar">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="navbar-right">
          <el-tooltip content="退出后台" placement="bottom">
            <div class="right-item" @click="handleLogout">
              <el-icon><SwitchButton /></el-icon>
            </div>
          </el-tooltip>
          <el-tooltip content="全屏" placement="bottom">
            <div class="right-item" @click="toggleFullScreen">
              <el-icon><FullScreen /></el-icon>
            </div>
          </el-tooltip>
          
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="avatar-container">
              <el-avatar :size="32" :src="store.getHeadImg" />
              <span class="username">{{store.getUsername}}</span>
              <el-icon><CaretBottom /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 标签页 -->
      <div class="tags-view">
        <el-scrollbar horizontal>
          <div class="tags-wrapper">
            <el-tag
                v-for="tag in visitedViews"
                :key="tag.path"
                :closable="true"
                :effect="route.path === tag.path ? 'dark' : 'plain'"
                @click="router.push(tag.path)"
                @close="closeSelectedTag(tag)"
            >
                {{ tag.name }}  <!-- 直接使用 name，因为已经在 addVisitedView 中处理过 -->
            </el-tag>
          </div>
        </el-scrollbar>
      </div>

      <!-- 内容区 -->
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 210px;
  background-color: #001529;
  transition: width 0.3s;
  z-index: 1001;
}

.sidebar.is-collapse {
  width: 64px;
}

.logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  overflow: hidden;
  background: #002140;
}

.logo span {
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.sidebar-toggle {
  cursor: pointer;
  font-size: 16px;
  color: white;
}

.main-container {
  margin-left: 210px;
  min-height: 100%;
  transition: margin-left 0.3s;
}

.main-container.is-collapse {
  margin-left: 64px;
}

.navbar {
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.tags-view {
  height: 34px;
  background: white;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12);
}

.tags-wrapper {
  padding: 4px 8px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
}

.app-main {
  padding: 10px;
  height: calc(100vh - 84px);
  overflow: auto;
  background-color: #F0F2F5;
}

:deep(.el-menu) {
  border-right: none;
  transition: width 0.3s;
}

:deep(.el-menu--collapse) {
  width: 64px;
}

:deep(.el-sub-menu .el-menu) {
  transition: width 0.3s, transform 0.3s;
}

:deep(.el-menu--popup) {
  min-width: 200px;
  transition: transform 0.3s;
}

.navbar {
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.right-item {
  padding: 8px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
}

.right-item:hover {
  background: rgba(0,0,0,0.04);
}

.avatar-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
}

.avatar-container:hover {
  background: rgba(0,0,0,0.04);
}

.username {
  font-size: 14px;
  color: #333;
}
</style>