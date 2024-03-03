<template>
  <div>
    <Header style="z-index: 1000"/>
    <div class="zhu" ref="zhu">
      <h1>欢迎光临</h1>
      <div class="zhu-title-overlay">
        <p>{{data.outString}}</p>
        <span>I</span>
      </div>
      <svg @click="gotoBody()" t="1680946162277" class="icon zhu-bottom" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1201" width="200" height="200"><path d="M511.853714 734.793143a55.296 55.296 0 0 1-38.326857-15.945143L28.16 273.188571a54.125714 54.125714 0 0 1 76.580571-76.580571l407.113143 407.04 407.405715-407.04a54.125714 54.125714 0 0 1 76.580571 76.580571L550.034286 718.848a53.833143 53.833143 0 0 1-38.253715 15.945143z" p-id="1202" fill="#ffffff"></path></svg>
      <div class="zhu-image">
        <video class="index-video" autoplay="autoplay" loop="loop" muted="muted" src="../assets/video/hutao.mp4"></video>
      </div>
    </div>
    <homeBody/>
  </div>
</template>

<script setup>
import homeBody from "../components/homeBody.vue";
import Header from "../components/Header.vue";
import {reactive,ref,watch,onMounted} from "vue";
import version from "danmaku-vue";
const String = '影孤怜夜永，永夜怜孤影'
const zhu = ref(null)
const data = reactive({
  inP:0,
  outString:'',
})
var start,reverse;

function inTimer(){
  data.outString += String.charAt(data.inP)
  data.inP += 1
}

function outTimer(){
  data.outString = data.outString.slice(0, data.outString.length - 1)
  data.inP -= 1
}

function gotoBody(){
  scrollTo({
    top:zhu.value.offsetHeight,
    behavior:'smooth'
  })
}

watch(()=>data.inP,(newVal)=>{
  if(newVal == String.length){
    clearInterval(start)
    setTimeout(()=>{
      reverse = setInterval(outTimer,100)
    },1000)
  }else if(data.inP == 0 || newVal == 0){
    clearInterval(reverse)
    setTimeout(()=>{
      start = setInterval(inTimer,200)
    },500)
  }
})

onMounted(()=>{
  console.log(window.location)
  start = setInterval(inTimer,200)
  let version = '1.0.0'
  console.log(`%c cavalry-boke %c V${version} `, "padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;", "padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;");
})
</script>

<style scoped>
@keyframes hideToShow {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes zhuye {
  from{
    opacity: 0;
    transform: translateY(-50px);
  }
  to{
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes bottom {
  0%{
    transform: translate(0px,-20px);
    opacity: 1;
  }
  40%{
    transform: translate(0px,20px);
    opacity: 0.3;
  }
  100%{
    transform: translate(0px,-20px);
    opacity: 1;
  }
}
.zhu{
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.zhu h1{
  font-size: 50px;
  margin-bottom: 20px;
  color: white;
}
.zhu p{
  font-size: 30px;
  display: inline-block;
}
.zhu-title-overlay{
  padding: 10px;
  background-color: rgba(0,0,0,0.3);
  border-radius: 20px;
  color: white;
}
.zhu-title-overlay span{
  font-weight: 200;
  font-size: 30px;
  animation: hideToShow .7s infinite;
}
.zhu-image{
  position: fixed;
  height: 100vh;
  width: 100%;
  /*background: url("../assets/home-bg.jpeg") no-repeat;*/
  /*background-size: 100% 100%;*/
  z-index: -1000;
  animation: zhuye 2s ease 0s 1 normal none running;
}
.index-video{
  width: 100%;
  height: 100%;
  object-fit:cover;
}
.zhu-bottom{
  width: 50px;
  height: 50px;
  position: absolute;
  top: 80%;
  animation: bottom 2s infinite;
  cursor: pointer;
  text-align: center;
}
</style>