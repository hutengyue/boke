<template>
  <div class="content" :style="{'opacity':display}">
    <h1>Cavalry</h1>
    <div class="content-background">
    </div>
    <div class="content-menu">
      <ul>
        <li @click="gotoHome()" >🐔首页</li>
        <li @click="gotoChat()" >🐔聊天</li>
        <li @click="gotoMessage()">🐔留言</li>
        <li @click="gotoTag()">🐔标签</li>
        <li @click="gotoCount()">🐔日志</li>
        <li @click="gotoVisit()">🐔统计</li>
        <li @click="gotoAbout()">🐔关于</li>
      </ul>
      <img class="content-head" @click="gotoUser" :src="headImg || proxy.$utils.getAssetsImg('Tom.jpg')">
    </div>
  </div>
</template>

<script scoped setup>
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

<style scoped>
@font-face {
  font-family: rain;
  src: url("../assets/wenzi.ttf");
}
*{
  font-family: rain;
}
.content{
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 60px;
  transition:all .3s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #363636;
  /*color:white;*/
}
.content:hover,.content.active{
  /*color: #363636;*/
  color: white;
}
.content-background{
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  transition: .3s;
  z-index: -1;
}
.content:hover .content-background,.content.active .content-background{
  opacity: 1;
  background-color: rgba(247,249,254,0.9);
  /*background-color: rgba(8,6,1,0.6);*/
}
.content h1{
  float: left;
  font-family: windy;
  font-size: 30px;
  margin-left: 30px;
  cursor: pointer;
  user-select: none;
  color: black;

}
.content-menu{
  height: 100%;
  display: flex;
  align-items: center;
}
.content-menu ul{
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.content-menu li{
  position: relative;
  flex-direction: row;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  border: 0px solid #ee7752;
  box-sizing: border-box;
  margin-left: 15px;
  margin-right: 15px;
  color:black;

}
.content-menu li::after{
  content: "";
  background-color: #ee7752;
  bottom: 0;
  left: 50%;
  position: absolute;
  width: 0;
  height: 6px;
  transform: translateX(-50%);
  transition: all .25s ease-in-out;
}
.content-menu li:hover{
  color: #ee7752;
}
.content-menu li:hover::after{
  width: 100%;
}
.content-head{
  float: right;
  width: 34px;
  height: 34px;
  border-radius: 100%;
  margin-left: 15px;
  margin-right: 30px;
  cursor: pointer;
  user-select: none;
}
</style>