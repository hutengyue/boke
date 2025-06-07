<template>
  <div>
    <Header style="z-index: 1000"></Header>
    <div class="zhu" ref="zhu">
      <h1>欢迎光临</h1>
      <div class="zhu-title-overlay">
        <p>{{data.outString}}</p>
        <span>I</span>
      </div>
      <svg @click="gotoBody()" t="1680946162277" class="icon zhu-bottom" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1201" width="200" height="200"><path d="M511.853714 734.793143a55.296 55.296 0 0 1-38.326857-15.945143L28.16 273.188571a54.125714 54.125714 0 0 1 76.580571-76.580571l407.113143 407.04 407.405715-407.04a54.125714 54.125714 0 0 1 76.580571 76.580571L550.034286 718.848a53.833143 53.833143 0 0 1-38.253715 15.945143z" p-id="1202" fill="#ffffff"></path></svg>
      <div id="screen">
      </div>
    </div>
    <HomeBody/>
  </div>
</template>

<script setup>
import * as THREE from 'three'
import Header from "../components/header.vue";
import HomeBody from "../components/homeBody.vue";
import {reactive,ref,watch,onMounted} from "vue";

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
  start = setInterval(inTimer,200)
  let version = '1.0.0'
  console.log(`%c cavalry-boke %c V${version} `, "padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;", "padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;");


  // 设置场景
  const scene = new THREE.Scene()
// 设置相机
  const camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,1000)
  camera.position.set(0,0.3,4.5)
// 渲染器
  let renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth,window.innerHeight)
  document.getElementById('screen').appendChild(renderer.domElement)

// 监听屏幕大小变化
  window.addEventListener("resize",()=>{
    renderer.setSize(window.innerWidth,window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
  })

// 加载纹理
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(new URL('../assets/image/home/home.jpeg',import.meta.url).href)
  const depthTexture = textureLoader.load(new URL('../assets/image/home/shader2.png',import.meta.url).href)

// 创建屏幕
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let geomery
  if(isMobile){
    geomery = new THREE.PlaneGeometry(9.6,5.4)
  }else{
    geomery = new THREE.PlaneGeometry(19.2,10.8)
  }
// 创建鼠标对象
  const mouse = new THREE.Vector2()
// 设置着色器材质
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: texture },
      uDepthTexture: { value: depthTexture },
      uMouse: { value: mouse }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D uTexture;
    uniform sampler2D uDepthTexture;
    uniform vec2 uMouse;
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      vec4 depth = texture2D(uDepthTexture, vUv);
      float depthValue = depth.r;
      float x = vUv.x + (uMouse.x+sin(uTime))*0.004*depthValue;
      float y = vUv.y + (uMouse.y+cos(uTime))*0.004*depthValue;
      vec4 newColor = texture2D(uTexture, vec2(x, y));
      gl_FragColor = newColor;
    }
  `,
  })
  const plane = new THREE.Mesh(geomery,material)
  scene.add(plane)

// 设置渲染函数
  const render = () =>{
    material.uniforms.uMouse.value = mouse;
    material.uniforms.uTime.value = performance.now() / 400;
    requestAnimationFrame(render)
    renderer.render(scene,camera)
  }
  render()

// 设置鼠标移动监听事件
  window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 1 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 1 + 1;
  });

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
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", sans-serif;
}
.zhu h1{
  font-size: 60px;
  margin-bottom: 20px;
  color: white;
  text-shadow: 2px 2px 10px #000;
}
.zhu p{
  font-size: 30px;
  display: inline-block;
}
.zhu-title-overlay{
  padding: 10px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 20px;
  color: white;
}
.zhu-title-overlay span{
  font-weight: 200;
  font-size: 30px;
  animation: hideToShow .7s infinite;
}
#screen{
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: -1000;
  animation: zhuye 2s ease 0s 1 normal none running;
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
@media screen and (max-width: 480px) {
  .zhu{
   height: 50vh;
  }
  .zhu h1{
   font-size: 30px;
  }
  .zhu p{
    font-size:15px;
  }
  .zhu span{
   font-size: 15px;
  }
  .zhu-bottom{
   width: 30px;
   height: 30px;
  }
}
</style>