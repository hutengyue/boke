<script setup>
import {getCurrentInstance,ref,onMounted,onBeforeUnmount} from "vue";
import {useRouter} from 'vue-router';
import useStore from "../store/index.js";
import MobileMenu from './MobileMenu.vue';

const {proxy} = getCurrentInstance()
const router = useRouter()
const store = useStore()
let scrollTimeout = null;
let isScrollingDown = false;
let lastScrollY = window.pageYOffset;

// let props = defineProps({
//   active:Boolean
// })
var headImg = ref('')
let display = ref('1')
let category = ref([])

const isMenuOpen = ref(false)
const isCategoryDropdownOpen = ref(false); // 新增：控制分类下拉菜单

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
  if (!isMenuOpen.value) {
    // 如果主菜单关闭，也关闭分类下拉
    isCategoryDropdownOpen.value = false;
  }
}

function toggleCategoryDropdown(event) {
  // 只在移动端（主菜单激活时）通过点击切换分类下拉
  if (isMenuOpen.value) {
    event.stopPropagation(); // 防止冒泡关闭主菜单或触发其他父级事件
    isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value;
  }
  // PC端依赖CSS hover，此处不作处理
}

// 关闭所有菜单
function closeAllMenus() {
  isMenuOpen.value = false;
  isCategoryDropdownOpen.value = false;
}

function gotoHome(){
  router.push('/')
  closeAllMenus();
}
function gotoChat(){
  router.push('/openIM')
  closeAllMenus();
}
function gotoMessage(){
  router.push('/message')
  closeAllMenus();
}
function gotoUser(){
  router.push('/user')
  closeAllMenus();
}
function gotoCount(){
  router.push('/log')
  closeAllMenus();
}
function gotoVisit(){
  router.push('/visit')
  closeAllMenus();
}
function gotoAbout(){
  router.push('/about')
  closeAllMenus();
}
function gotoTag(){
  router.push('/tag')
  closeAllMenus();
}
function gotoCategory(categoryId){
  router.push(`/category?id=${categoryId}`)
  closeAllMenus(); // 点击具体分类项后，主菜单和分类下拉都关闭
}

const navFunctions = [gotoHome, gotoChat, gotoMessage, gotoTag, gotoCount, gotoVisit, gotoAbout]
navFunctions.forEach(func => {
  const original = func
  func = (...args) => {
    original(...args)
    isMenuOpen.value = false
  }
})

onMounted(()=>{
  window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    isScrollingDown = currentScrollY > lastScrollY;
    if (isScrollingDown) {
      display.value = '0';
    }

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const newScrollY = window.pageYOffset;
      if (newScrollY <= lastScrollY) {
        display.value = '1';
      }

      lastScrollY = newScrollY;
    }, 100);
  });


  headImg.value = store.getHeadImg
  proxy.$bus.on('headImg',()=>{
    headImg.value = store.getHeadImg
  })

  proxy.$http.get('/category').then(res=>{
    category.value = res.data
  })
})
onBeforeUnmount(()=>{
  proxy.$bus.off('headImg')
})

</script>

<template>
  <div @click="isMenuOpen = false" style="position: fixed;background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;height: 100vh;top: 0;left: 0; z-index: 1000;animation: all .3s;" v-if="isMenuOpen"></div>
  <div class="content" :style="{'opacity':display}">
    <h1 @click="gotoHome">Cavalry</h1>
    <div class="content-background"></div>
    <div class="content-menu">
      <!-- PC端菜单 -->
      <ul class="pc-menu">
        <li @click="gotoHome()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span>首页</span>
        </li>
        <li class="category-dropdown">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
          <span>分类</span>
          <div class="dropdown-menu">
            <div class="category-grid">
              <li v-for="item in category" :key="item.categoryId" @click.stop="gotoCategory(item.categoryId)">
                {{ item.categoryName }}
              </li>
            </div>
          </div>
        </li>
        <li @click="gotoTag()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
          <span>标签</span>
        </li>
        <li @click="gotoChat()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>聊天</span>
        </li>
        <li @click="gotoMessage()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span>留言</span>
        </li>
        <li @click="gotoCount()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span>日志</span>
        </li>
        <li @click="gotoVisit()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
          <span>统计</span>
        </li>
        <li @click="gotoAbout()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>关于</span>
        </li>
      </ul>
      <!-- 移动端菜单按钮 -->
      <div class="mobile-controls">
        <div class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <img class="avatar" @click="gotoUser" :src="headImg || proxy.$utils.getAssetsImg('Tom.jpg')">
    </div>
  </div>
  <!-- 移动端菜单组件 -->
  <MobileMenu 
    v-model:isOpen="isMenuOpen"
    :category="category"
    :headImg="headImg"
  />
</template>

<style scoped>
.content {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 60px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background: transparent;
}

.content:hover {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.4);
}

.content h1 {
  font-size: 24px;
  margin-left: 20px;
  cursor: pointer;
  user-select: none;
  color: #fff;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.content:hover h1 {
  color: #1d1d1f;
  text-shadow: none;
}

.content-menu {
  display: flex;
  align-items: center;
}

.pc-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
}

.pc-menu li {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 15px;
  color: #1d1d1f;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.pc-menu li:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: #0071e3;
}

.category-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 200px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 10px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1001;
}

.category-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(5px);
}

.category-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dropdown-menu li {
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
  transition: all 0.2s ease;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  text-align: center;
}

.dropdown-menu li:hover {
  background: rgba(0, 113, 227, 0.1);
  color: #0071e3;
  transform: translateX(5px);
}

.icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  color: #1d1d1f;
}

.pc-menu li:hover .icon {
  color: #0071e3;
}

.mobile-controls {
  display: none;
  align-items: center;
  gap: 10px;
  margin-right: 10px;
}

.content-head {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-head:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.menu-toggle {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: #1d1d1f;
  transition: all 0.3s;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;
}

@media (max-width: 768px) {
  .content {
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.4);
    padding: 0 10px;
  }

  .content h1 {
    font-size: 20px;
    margin-left: 5px;
    color: #1d1d1f;
    text-shadow: none;
  }

  .pc-menu {
    display: none;
  }

  .mobile-controls {
    display: flex;
  }

  .avatar{
    margin-right: 0;
  }
}

@media (max-width: 360px) {
  .content h1 {
    font-size: 18px;
  }
}
</style>