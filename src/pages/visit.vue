<template>
  <Header style="z-index: 1000"></Header>
  <img class="bkg" src="../assets/image/visit.png" alt="">
  <div class="body">
    <div class="page">
      <h1 class="page-title">统计</h1>
      <div class="statistic">
        <div class="statistic-detail">
          <p>昨日IP</p>
          <p>100</p>
        </div>
        <div class="statistic-detail">
          <p>昨日浏览量</p>
          <p>100</p>
        </div>
        <div class="statistic-detail">
          <p>今日IP</p>
          <p>100</p>
        </div>
        <div class="statistic-detail">
          <p>今日浏览量</p>
          <p>100</p>
        </div>
        <div class="statistic-detail">
          <p>总浏览量</p>
          <p>1000</p>
        </div>
      </div>
      <Line/>
    </div>
    <div class="allocation">
      <ChinaMap v-if="data.visitList.length" :visitList="data.visitList"/>
      <Pie/>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/header.vue";
import Line from '../components/statistic/line.vue'
import ChinaMap from '../components/statistic/chinaMap.vue'
import Pie from '../components/statistic/pie.vue'
import {onMounted,getCurrentInstance,reactive} from "vue";
const {proxy} = getCurrentInstance()
var data = reactive({
  visitList:[]
})
function init(){
  proxy.$http.get('/visit/detail').then((res)=>{
    data.visitList = res.data
  })
}
onMounted(()=>{
  init()
})
</script>

<style scoped>
.bkg{
  position: fixed;
  height: 100vh;
  width: 100%;
  object-fit: cover;
  z-index: -1000;
}
.body{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 5px;
}
.page{
  margin-top: 70px;
  width: 99%;
  max-width: 1300px;
  background-color: rgba(255,255,255,0.9);
  border-radius: 20px;
  padding: 10px 35px;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.page-title{
  margin-top: 30px;
}
.statistic{
  margin-top: 50px;
  width: 90%;
  max-width: 700px;
  height: 140px;
  border-radius: 20px;
  border: 2px solid #e67474;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px 20px;
}
.statistic-detail{
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.allocation{
  margin-top: 70px;
  width: 99%;
  max-width: 1300px;
  background-color: rgba(255,255,255,0.9);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 50px 0px;
}
</style>