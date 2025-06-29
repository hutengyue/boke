<template>
  <el-drawer
    v-model="localIsOpen"
    direction="rtl"
    size="60%"
    :show-close="false"
    :with-header="false"
  >
    <div class="mobile-menu">
      <div class="mobile-menu-header">
        <div style="display: flex;align-items: center;">
          <img class="avatar" :src="headImg || proxy.$utils.getAssetsImg('Tom.jpg')" @click="gotoUser">
          <p style="margin-left: 20px;font-weight: bold;font-size: 18px;">欢迎光临</p>
        </div>
        <el-icon class="close-icon" @click="close">
          <Close />
        </el-icon>
      </div>
      <div class="mobile-menu-content">
        <div class="menu-item" @click="gotoHome">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span>首页</span>
        </div>
        <div class="menu-item has-submenu" @click="toggleCategory">
          <div class="menu-item-content">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
            <span>分类</span>
            <svg class="arrow-icon" :class="{ 'rotated': isCategoryOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
          <div class="submenu" :class="{ 'open': isCategoryOpen }">
            <div v-for="item in category" 
                 :key="item.categoryId" 
                 class="submenu-item"
                 @click.stop="gotoCategory(item.categoryId)">
              {{ item.categoryName }}
            </div>
          </div>
        </div>
        <div class="menu-item" @click="gotoTag">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
          <span>标签</span>
        </div>
        <div class="menu-item" @click="gotoChat">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>聊天</span>
        </div>
        <div class="menu-item" @click="gotoMessage">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span>留言</span>
        </div>
        <div class="menu-item" @click="gotoCount">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span>日志</span>
        </div>
        <div class="menu-item" @click="gotoVisit">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
          <span>统计</span>
        </div>
        <div class="menu-item" @click="gotoAbout">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>关于</span>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'
import { Close } from '@element-plus/icons-vue'

const localIsOpen = ref(false)

const props = defineProps({
  isOpen: Boolean,
  category: Array,
  headImg: String
})

// 监听prop变化，更新本地状态
watch(() => props.isOpen, (newVal) => {
  localIsOpen.value = newVal
})

// 监听本地状态变化，通知父组件
watch(localIsOpen, (newVal) => {
  emit('update:isOpen', newVal)
})

const emit = defineEmits(['update:isOpen'])
const router = useRouter()
const { proxy } = getCurrentInstance()

const isCategoryOpen = ref(false)

const close = () => {
  localIsOpen.value = false
  isCategoryOpen.value = false
}

const toggleCategory = (e) => {
  e.stopPropagation()
  isCategoryOpen.value = !isCategoryOpen.value
}

const gotoHome = () => {
  router.push('/')
  close()
}

const gotoCategory = (categoryId) => {
  router.push(`/category?id=${categoryId}`)
  close()
}

const gotoTag = () => {
  router.push('/tag')
  close()
}

const gotoChat = () => {
  router.push('/openIM')
  close()
}

const gotoMessage = () => {
  router.push('/message')
  close()
}

const gotoCount = () => {
  router.push('/log')
  close()
}

const gotoVisit = () => {
  router.push('/visit')
  close()
}

const gotoAbout = () => {
  router.push('/about')
  close()
}

const gotoUser = () => {
  router.push('/user')
  close()
}
</script>

<style scoped>
.mobile-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.close-icon {
  font-size: 20px;
  cursor: pointer;
  color: #333;
}

.mobile-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.mobile-menu-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.menu-item {
  display: flex;
  flex-direction: column;
  padding: 0;
  cursor: pointer;
  user-select: none;
  color: black;
}

.menu-item-content {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  gap: 12px;
  transition: background-color 0.2s ease;
}

.menu-item:not(.has-submenu) {
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

.menu-item:active {
  background: rgba(0, 113, 227, 0.08);
}

.icon {
  width: 24px;
  height: 24px;
  color: #333;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  margin-left: auto;
  transition: transform 0.3s ease;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

.submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.submenu.open {
  max-height: 500px;
}

.submenu-item {
  padding: 12px 20px 12px 56px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submenu-item:active {
  background: rgba(0, 113, 227, 0.08);
}

.has-submenu .menu-item-content {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>