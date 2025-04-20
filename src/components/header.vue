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

function gotoHome(){
  router.push('/')
}
function gotoChat(){
  router.push('/chat')
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
        <li @click="gotoHome()"><i class="icon">🏠</i><span>首页</span></li>
        <li @click="gotoChat()"><i class="icon">💭</i><span>聊天</span></li>
        <li @click="gotoMessage()"><i class="icon">📝</i><span>留言</span></li>
        <li @click="gotoTag()"><i class="icon">🏷️</i><span>标签</span></li>
        <li @click="gotoCount()"><i class="icon">📊</i><span>日志</span></li>
        <li @click="gotoVisit()"><i class="icon">📈</i><span>统计</span></li>
        <li @click="gotoAbout()"><i class="icon">ℹ️</i><span>关于</span></li>
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
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
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
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.content:hover .content-menu li {
  color: #1d1d1f;
  text-shadow: none;
}

.content-menu li:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: #1d1d1f;
  text-shadow: none;
}

.icon {
  font-size: 18px;
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