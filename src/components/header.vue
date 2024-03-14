<template>
  <div class="content">
    <h1>Cavalry</h1>
    <div class="content-background">
    </div>
    <div class="content-menu">
      <img class="content-head" @click="gotoUser" :src="headImg || proxy.$utils.getAssetsImg('Tom.jpg')">
      <ul>
        <li @click="gotoHome()" >🐔首页</li>
        <li @click="gotoChat()" >🐔聊天</li>
        <li @click="gotoMessage()">🐔留言</li>
        <li @click="gotoCount()">🐔日志</li>
        <li @click="gotoVisit()">🐔统计</li>
        <li @click="gotoAbout()">🐔关于</li>
      </ul>
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
var headImg = ref('')

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

onMounted(()=>{
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
.content{
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 70px;
}
.content-background{
  position: fixed;
  background-color: black;
  opacity: 0;
  width: 100%;
  height:70px;
  transition: .5s;
  z-index: -1;
}
.content:hover .content-background{
  opacity: 0.3;
}
.content h1{
  float: left;
  font-family: windy;
  font-size: 30px;
  margin: 10px 0 0 30px;
  cursor: pointer;
  user-select: none;
  color: white;
  mix-blend-mode: difference;
}
.content-menu{
  float: right;
}
.content-menu ul{
  display: flex;
  margin-top: 20px;
  width: 500px;
  justify-content: space-between;
}
.content-menu li{
  position: relative;
  flex-direction: row;
  height: 50px;
  list-style: none;
  font-size: 22px;
  cursor: pointer;
  user-select: none;
  border: 0px solid #ee7752;
  transition: 0.5s;
  box-sizing: border-box;
  color: white;
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
  margin: 20px 30px 0 30px;
  cursor: pointer;
  user-select: none;
}
</style>