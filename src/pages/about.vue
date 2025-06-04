<template>
  <div class="all">
    <Header :active="true" style="z-index: 1000"></Header>
    <div class="aboutBox">
      <div class="authorBox">
        <div class="authorLeft">
          <span>资深CV工程师</span>
          <span>头带小型地中海</span>
          <span>乐观 积极 向上</span>
          <span>不舍弃永远得不到</span>
        </div>
        <div class="authorMiddle">
          <div class="authorImg">
            <img src="../assets/image/about/Tom.jpg" alt="">
          </div>
        </div>
        <div class="authorRight">
          <span>穷其道者归处亦同</span>
          <span>未来の外卖骑手</span>
          <span>干饭人 干饭魂</span>
          <span>每天睡觉12小时</span>
        </div>
        <div class="authorDot"></div>
      </div>
      <h1>cavalry</h1>
      <ul class="skill">
        <li>
          <p>HTML5/CSS3</p>
          <div class="progress">
            <div class="progressLine" style="width: 60%;"></div>
            <span>制作网站能力</span>
          </div>
        </li>
        <li>
          <p>JavaScript/Ts</p>
          <div class="progress">
            <div class="progressLine" style="width: 70%;"></div>
            <span>勉强凑合</span>
          </div>
        </li>
        <li>
          <p>Node.Js</p>
          <div class="progress">
            <div class="progressLine" style="width: 60%;"></div>
            <span>辣鸡后端</span>
          </div>
        </li>
        <li>
          <p>设计能力</p>
          <div class="progress">
            <div class="progressLine" style="width: 40%;"></div>
            <span>一坨</span>
          </div>
        </li>
        <li>
          <p>Vue2/Vue3</p>
          <div class="progress">
            <div class="progressLine" style="width: 80%;"></div>
            <span>难解难分</span>
          </div>
        </li>
        <li>
          <p>Java后端</p>
          <div class="progress">
            <div class="progressLine" style="width: 50%;"></div>
            <span>一知半解</span>
          </div>
        </li>
      </ul>
      <div class="authorContent">
        <div class="itemMask">
          <div class="self">
            <div class="info-card">
              <p class="info-label">专业</p>
              <p class="info-value">软件工程</p>
            </div>
            <div class="info-card">
              <p class="info-label">身份</p>
              <p class="info-value">2024届毕业生</p>
            </div>
            <div class="info-card">
              <p class="info-label">星座</p>
              <p class="info-value">狮子座</p>
            </div>
          </div>
        </div>
        <div class="itemGroup">
          <div class="itemMap">
            <span class="mapTitle">
              我是一个来自台州的杭漂
            </span>
          </div>
        </div>
      </div>
      <div class="authorContent leafImg">
        <div class="container">
          <div v-for="(item,index) in game" :key="index" :class="{active:active===index,'item':true}" @click="change(index)" ref="item">
            <img class="itemImg" v-lazy="item.image" alt="">
            <div class="shadow"></div>
            <div class="contents">
              <img class="icon" v-lazy="item.icon">
              <div class="text">{{item.text}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="introduce">
        <h1>何故建站</h1>
        <p>每一个计算机人都想拥有自己的一个小空间</p>
        <p>大学起就有心思，只因技术不成熟作罢</p>
        <p>此站为vue3全家桶+vite+nest.js+typeorm+mysql等合成的产物，是一个从零开始的网站，为了磨练自己，中间碰到了很多难题也学会了很多，也希望在互联网留下我的一点一滴，虽只是沧海一粟</p>
        <p>这是我所做的，最有成就感的事，作为一个软工人，博客是必须的</p>
        <p>感谢各位旅人观看</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/header.vue";
import {getCurrentInstance, ref,isRef,reactive} from "vue";
const {proxy} = getCurrentInstance()
var game = [
  {text:'摩尔勇士',image:proxy.$utils.getAssetsImg('about/moer.jpeg'),icon:proxy.$utils.getAssetsImg('about/moer1.png')},
  {text:'赛尔号',image:proxy.$utils.getAssetsImg('about/saier.jpeg'),icon:proxy.$utils.getAssetsImg('about/saier1.png')},
  {text:'300英雄',image:proxy.$utils.getAssetsImg('about/300.jpg'),icon:proxy.$utils.getAssetsImg('about/3001.png')},
  {text:'永劫无间',image:proxy.$utils.getAssetsImg('about/yjwj.png'),icon:proxy.$utils.getAssetsImg('about/yjwj1.webp')},
  {text:'崩坏3',image:proxy.$utils.getAssetsImg('about/benghuai.png'),icon:proxy.$utils.getAssetsImg('about/benghuai1.png')},
  {text:'原神',image:proxy.$utils.getAssetsImg('about/yuanshen.png'),icon:proxy.$utils.getAssetsImg('about/yuanshen1.png')},
]
var active = ref(0)
function change(index){
  active.value = index
}
</script>

<style scoped>
@keyframes floating {
  0%{
    transform: translate(0,-4px);
  }
  50%{
    transform: translate(0,4px);
  }
  100%{
    transform: translate(0,-4px);
  }
}
@keyframes animate {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
@keyframes slideIn {
  0%{
    opacity: 0;
    transform: translateY(20px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
.all{
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  background-color: #f8f8fa;
}
.aboutBox{
  width: 100%;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: slideIn .5s .1s backwards;
  -webkit-animation:slideIn .5s .1s backwards;
}
.authorBox{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 70px;
}
.authorLeft{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 30px;
}
.authorLeft span:first-child,.authorLeft span:last-child{
  margin-right: -16px;
}
.authorRight span:first-child,.authorRight span:last-child{
  margin-left: -16px;
}
.authorLeft span:nth-child(2),.authorRight span:nth-child(2){
  animation-delay: 0.6s;
}
.authorLeft span:nth-child(3),.authorRight span:nth-child(3){
  animation-delay: 1.2s;
}
.authorLeft span:nth-child(4),.authorRight span:nth-child(4){
  animation-delay: 1.8s;
}
.authorLeft span,.authorRight span{
  transform: translate(0,-4px);
  padding: 3px 10px;
  background-color: #fff;
  box-shadow: 0 8px 16px -4px #2c2d300c;
  border:1px solid #e3e8f7;
  border-radius: 40px;
  margin-top: 6px;
  font-size: 14px;
  font-weight: bold;
  animation: 6s ease-in-out 0s infinite normal none running floating;
}
.authorMiddle{
  position: relative;
  width: 189px;
  height: 189px;
  background-color: rgba(253,253,253,0.8);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.authorMiddle::before{
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background-image: conic-gradient(transparent,transparent,transparent,#8758FF);
  animation: animate 4s linear infinite;
  animation-delay: -2s;
}
.authorMiddle::after{
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background-image: conic-gradient(transparent,transparent,transparent,#5CB8E4);
  animation: animate 4s linear infinite;
}
.authorImg{
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  width: 180px;
  height: 180px;
  z-index: 10;
}
.authorImg img{
  display: block;
  max-width: 100%;
  height: 100%;
  pointer-events: none;
}
.authorRight{
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  align-items: flex-start;
}
.authorDot{
  width: 30px;
  height: 30px;
  background: #6dbf8f;
  position: absolute;
  border-radius: 50%;
  border: 6px solid rgba(253,253,253,0.9);
  top: 50%;
  left: 50%;
  z-index: 20;
  transform: translate(51px,54px);
}
.skill{
  margin-top: 30px;
  width: 55%;
  min-width: 600px;
}
.skill li{
  list-style: none;
  padding: 13px 0;
  width: 45%;
  float: left;
  margin-right: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.skill p{
  display: inline-block;
  margin-right: 3%;
  font-size: 18px;
}
.progress{
  display: inline-block;
  height: 15px;
  background-color: rgb(247,249,254);

  /*background-color: #fff;*/
  box-shadow: 0 8px 16px -4px #2c2d300c;
  border:1px solid #e3e8f7;
  border-radius: 10px;
  width: 60%;
}
.progressLine{
  background: linear-gradient(-45deg,#a3e9eb,#bdbdf0,#eec1ea);;
  height: 15px;
  position: relative;
  border-radius: 10px;
}
.progressLine::after{
  content: '';
  display: inline-block;
  position: absolute;
  right: -4px;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid black;
}
.progress span{
  font-size: 12px;
  color: hsla(0,0%,100%,.8);
  opacity: 0;
  position: relative;
  top: 0px;
  letter-spacing: .5em;
  transition: all .3s;
  background: rgba(0,0,0,.9);
  padding: 3px 3px;
}
.progress:hover span{
  opacity: 1;
}
.authorContent{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
}
.itemMask{
  min-height: 380px;
  width: 39%;
  overflow: hidden;
  border-radius: 20px;
  padding: 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.self {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 1rem;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.info-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 0.5rem;
}

.info-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.itemGroup{
  width: 59%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.itemMap{
  min-height: 200px;
  max-height: 400px;
  overflow: hidden;
  margin-bottom: 0.5rem;
  height: 100%;
  border-radius: 24px;
  position: relative;
  background: url("../assets/image/zj.png") no-repeat;
  background-size: 130%;
  transition: 1.5s ease-in-out;
  background-position-x: 40%;
  background-position-y: 10%;
}
.itemMap:hover{
  background-size: 150%;
  background-position-x: 100%;
  background-position-y: 75%;
}
.mapTitle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem 2rem;
  background: rgba(255,255,255,0.6);
  backdrop-filter: saturate(180%) blur(2px);
  transition: 1s ease-in-out;
  font-size: 20px;
}
.itemMap:hover .mapTitle{
  bottom: -100%;
}
.leafImg{
  margin-top: 0;
  overflow: hidden;
  padding: 10px 0;
  position: relative;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 24px;
}
.container{
  width: 100%;
  height: 350px;
  overflow: hidden;
  display: flex;
}
.item{
  position: relative;
  width: 60px;
  cursor: pointer;
  border-radius: 30px;
  margin: 10px;
  transition: 0.5s cubic-bezier(0.05,0.61,0.41,0.95);
  overflow: hidden;
}
.itemImg{
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
}
.item.active{
  flex: 1;
  margin:0;
  border-radius: 40px;
}
.shadow{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  transition: 0.5s cubic-bezier(0.05,0.61,0.41,0.95);
}
.item.active .shadow{
  background: linear-gradient(to top,rgba(0,0,0,0.35) 65%,transparent);
}
.contents{
  position: absolute;
  display: flex;
  left: 10px;
  right: 0;
  bottom: 10px;
  height: 40px;
  transition: 0.5s cubic-bezier(0.05,0.61,0.41,0.95);
}
.item.active .contents{
  bottom: 20px;
  left: 20px;
}
.contents .icon{
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
}
.contents .text{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
  justify-content: center;
  color: #fff;
}
.introduce{
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  box-shadow: 0 8px 16px -4px #2c2d300c;
  border-radius: 20px;
  border:1px solid #e3e8f7;
  padding: 1.5rem 2.5rem;
}
.introduce p{
  margin-top: 20px;
  font-size: 16px;
}
</style>