<script setup>
import {getCurrentInstance,ref,onMounted,onBeforeUnmount} from "vue";
import {useRouter} from 'vue-router';
import useStore from "../store/index.js";
const {proxy} = getCurrentInstance()
const router = useRouter()
const store = useStore()

// let props = defineProps({
//   active:Boolean
// })
var headImg = ref('')
let lastScrollPosition = ref(window.pageYOffset)
let display = ref('1')
let category = ref([])

function gotoHome(){
  router.push('/')
}
function gotoChat(){
  router.push('/openIM')
}
function gotoMessage(){
  router.push('/message')
}
function gotoUser(){
  router.push('/user')
}
function gotoCount(){
  router.push('/log')
}
function gotoVisit(){
  router.push('/visit')
}
function gotoAbout(){
  router.push('/about')
}
function gotoTag(){
  router.push('/tag')
}
function gotoCategory(categoryId){
  router.push(`/category?id=${categoryId}`)
}

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
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
    const pageY = window.pageYOffset// 滚动条距离顶部的长度
    if (lastScrollPosition.value < pageY) {
      display.value = '0'
    } else {
      display.value = '1'
    }
    lastScrollPosition.value = pageY
  },true)
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
  <div class="content" :style="{'opacity':display}">
    <h1>Cavalry</h1>
    <div class="content-background"></div>
    <div class="content-menu">
      <div class="menu-toggle" :class="{ 'active': isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul :class="{ 'menu-active': isMenuOpen }">
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
          <ul class="dropdown-menu">
            <li v-for="item in category" :key="item.categoryId" @click="gotoCategory(item.categoryId)">
              {{ item.categoryName }}
            </li>
          </ul>
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
      <img class="content-head" @click="gotoUser" :src="headImg || proxy.$utils.getAssetsImg('Tom.jpg')">
    </div>
  </div>
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

.content-menu ul {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
}

.content-menu li {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 15px;
  color: #1d1d1f;  /* 改为深色 */
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.8);  /* 添加半透明背景 */
  backdrop-filter: blur(8px);  /* 添加模糊效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);  /* 添加轻微阴影 */
}

.content-menu li:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: #0071e3;
  transform: scale(1.1);
  text-shadow: none;
}

.category-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.category-dropdown:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.category-dropdown:hover .dropdown-menu {
  display: block;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 2px);
  left: -50%;
  min-width: 180px;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 8px;
  opacity: 0;
  transition: all 0.2s ease-out;
  z-index: 1000;
  pointer-events: none;
}

.dropdown-menu li {
  padding: 10px 16px;
  margin: 2px 0;
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
  cursor: pointer;
  transition: all 0.2s ease-out;
  background: white;
  border-radius: 8px;
  display: block;
  text-align: center;
}

.dropdown-menu li:hover {
  background: rgba(0, 113, 227, 0.08);
  color: #0071e3;
  transform: none;
}

.icon {
  font-size: 18px;
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  color: #1d1d1f;
}

.content-menu li:hover .icon {
  color: #0071e3;
  transform: scale(1.1);
}

.content-head {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin: 0 20px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-head:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  cursor: pointer;
  margin-right: 10px;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content:hover .menu-toggle span {
  background: #1d1d1f;
  box-shadow: none;
}

@media (max-width: 768px) {
  .content {
    padding: 0 10px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }

  .content h1 {
    font-size: 20px;
    margin-left: 5px;
    color: #1d1d1f;
    text-shadow: none;
  }

  .menu-toggle {
    display: flex;
    margin-right: 5px;
    z-index: 100;
  }

  .menu-toggle span {
    background: #1d1d1f;
    box-shadow: none;
  }

  .content-menu ul {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 10px 0;
    margin: 0;
    gap: 0;
    transform: translateY(-150%);
    opacity: 0;
    transition: all 0.3s ease;
    visibility: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .content-menu ul.menu-active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .content-menu li {
    width: 100%;
    margin: 0;
    padding: 15px 20px;
    border-radius: 0;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    color: #1d1d1f;
    text-shadow: none;
  }

  .content-menu li:last-child {
    border-bottom: none;
  }

  .content-menu li:hover {
    background: rgba(0, 0, 0, 0.03);
    transform: none;
    box-shadow: none;
  }

  .content-menu li .icon {
    width: 24px;
    margin-right: 12px;
  }

  .content-menu li span {
    font-size: 16px;
  }

  .content-head {
    width: 32px;
    height: 32px;
    margin: 0 5px;
  }

  .menu-toggle {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-toggle span {
    position: absolute;
    width: 20px;
    height: 2px;
    transition: all 0.3s ease;
  }

  .menu-toggle span:nth-child(1) {
    transform: translateY(-6px);
  }

  .menu-toggle span:nth-child(3) {
    transform: translateY(6px);
  }

  .menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg);
  }

  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg);
  }
}

@media (max-width: 360px) {
  .content h1 {
    font-size: 18px;
  }

  .content-menu li {
    padding: 12px 15px;
  }

  .content-menu li span {
    font-size: 14px;
  }
}
</style>