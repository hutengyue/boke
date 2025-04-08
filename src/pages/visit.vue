<template>
  <Header style="z-index: 1000"></Header>
  <div class="body">
    <div class="page">
      <h1 class="page-title">统计</h1>
      <div class="statistic">
        <div class="statistic-detail">
          <p>昨日IP</p>
          <p>{{ data.yesterday.ip }}</p>
        </div>
        <div class="statistic-detail">
          <p>昨日浏览量</p>
          <p>{{ data.yesterday.number }}</p>
        </div>
        <div class="statistic-detail">
          <p>今日IP</p>
          <p>{{ data.today.ip }}</p>
        </div>
        <div class="statistic-detail">
          <p>今日浏览量</p>
          <p>{{ data.today.number }}</p>
        </div>
        <div class="statistic-detail">
          <p>总浏览量</p>
          <p>{{ data.total }}</p>
        </div>
      </div>
      <Line v-if="data.line.length" :lineData="data.line"/>
    </div>
    <div class="allocation">
      <ChinaMap v-if="data.list.length" :visitList="data.list"/>
      <Pie v-if="data.list.length" :visitList="data.list"/>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment';
import Header from "../components/header.vue";
import Line from '../components/statistic/line.vue'
import ChinaMap from '../components/statistic/chinaMap.vue'
import Pie from '../components/statistic/pie.vue'
import {onMounted,getCurrentInstance,reactive,nextTick} from "vue";
const {proxy} = getCurrentInstance()
var data = reactive({
  line:[],
  all:[],//总
  total:0,
  list:[],//选择列表
  today:{
    ip:0,
    number:0
  },
  yesterday:{
    ip:0,
    number:0
  }
})
function init() {
  proxy.$http.get('/visit/detail').then((res) => {
    data.total = res.data[0];
    data.all = res.data[1];
    const listMap = new Map();
    data.all.forEach((item) => {
      const date = item.createAt.substring(0, 10);
      if (!listMap.has(date)) {
        listMap.set(date, []);
      }
      listMap.get(date).push(item);
    });
    
    const today = getDay();
    const yesterday = getDay(1);

    listMap.forEach((list, date) => {
      const ipCount = computeIp(list);
      const visitCount = list.length;

      if (date === today) {
        data.list = list;
        data.today.ip = ipCount;
        data.today.number = visitCount;
      } else if (date === yesterday) {
        data.yesterday.ip = ipCount;
        data.yesterday.number = visitCount;
      }

      data.line.unshift({ name: date, number: visitCount, ip: ipCount });
    });
  });
}

function getDay(index = 0) {
  return moment().subtract(index, 'days').format('YYYY-MM-DD');
}

function computeIp(list) {
  const ipSet = new Set();
  list.forEach((item) => {
    ipSet.add(item.clientIp);
  });
  return ipSet.size;
}

onMounted(async () => {
  nextTick(()=>{
    init()
  })
})
</script>

<style scoped>
@font-face {
  font-family: rain;
  src: url("../assets/wenzi.ttf");
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
*{
  font-family: rain;
}
.body{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 5px;
  background-image: linear-gradient(90deg,rgba(37,82,110,.1) 1px,#fff 0),
  linear-gradient(180deg,rgba(37,82,110,.1) 1px,#fff 0);
  background-size: 3rem 3rem;
}
.page{
  margin-top: 70px;
  width: 99%;
  max-width: 1300px;
  background-color: #fff;
  box-shadow: 0 8px 16px -4px #2c2d300c;
  border-radius: 20px;
  border:1px solid #e3e8f7;
  padding: 10px 10px;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: bottom 1.5s ease 0s 1 normal none running;
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
  background-color: #fff;
  box-shadow: 0 8px 16px -4px #2c2d300c;
  border-radius: 20px;
  border:1px solid #e3e8f7;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 35px 0px;
  animation: bottom 1.5s ease 0s 1 normal none running;
}
</style>