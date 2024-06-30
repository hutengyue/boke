<template>
  <Header :active="true" style="z-index: 1000"></Header>
  <div>
    <div class="body">
      <div class="page">
        <h1 class="page-title">网站更新日志</h1>
        <div class="container">
          <span >updating.....</span>
          <div class="timeline">
            <div class="timeline-item" v-for="(item,index) in data.logList" key="index">
              <div class="timeline-item-title">
                <div class="item-circle">
                  <p>{{ item.createAt }}</p>
                </div>
              </div>
              <div class="timeline-item-content">
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive,onMounted,getCurrentInstance} from "vue";
import Header from "../components/header.vue";
const {proxy} = getCurrentInstance()
const data = reactive({
  logList:[]
})
onMounted(()=>{
  proxy.$http.get('/log').then((res)=>{
    data.logList = [...res.data].reverse()
  })
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
@keyframes zhuye {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@keyframes bottom {
  from{
    opacity: 0;
    transform: translate(0px,100px);
  }
  to{
    opacity: 1;
    transform: translate(0px,0px);
  }
}
.body{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 15px;
  background-color: rgb(247,249,254);
}
.page{
  margin-top: 70px;
  width: 90%;
  max-width: 1300px;
  background-color: #fff;
  box-shadow: 0 8px 16px -4px #2c2d300c;
  border-radius: 20px;
  border:1px solid #e3e8f7;
  padding: 10px 35px;
  font-weight: 700;
  font-size: 18px;
  min-height: 80%;
  animation: bottom 1.5s ease 0s 1 normal none running;
}
.page-title{
  text-align: center;
  color: rgb(50,50,50);
  margin-top: 20px;
}
.container{
  letter-spacing: 1px;
}
.container span{
  color: rgb(102,102,102);
  font-size: 20px;
}
.timeline{
  padding: 14px 20px 5px;
  border-left: 2px solid #e67474;
  margin: 0 0 20px 10px;
}
.timeline-item{
  margin: 0 0 15px;
}
.timeline-item-title{
  position: relative;
  color: #e67474;
}
.item-circle::before{
  position: absolute;
  top:50%;
  left: -27px;
  width: 6px;
  height: 6px;
  border: 3px solid #ff7242;
  border-radius: 50%;
  background: white;
  content:'';
  transition: all .3s;
  transform: translate(0,-50%);
}
.container p{
  line-height: 1.5;
  text-align: left;
  font-weight: 500;
  letter-spacing:1px;
  margin: 0 0 15px;
}
.timeline-item-content{
  position: relative;
  padding: 12px 15px;
  border-radius: 8px;
  background: rgba(254,250,199,0.8);
  color: #e67474;
  font-size: 17px;
}
.timeline-item-content>:last-child{
  margin-bottom: 0;
}
hr{
  position: relative;
  margin: 40px auto;
  border: 2px dashed rgba(255,255,255,0.4);
  width: calc(100% - 4px);
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
hr:before{
  position: absolute;
  top: -10px;
  left: 5%;
  z-index: 1;
  color: rgba(255,255,255,0.7);
  content: '\f0c4';
  font-size: 20px;
  line-height: 1;
  transition: all 1s ease-in-out;
  display: inline-block;
  font-weight: 600;
  text-rendering: auto;
}
</style>