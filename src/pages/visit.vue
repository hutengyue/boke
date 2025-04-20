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
.body {
  background: linear-gradient(135deg, #f2f2f7 0%, #fff 100%);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 24px 40px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
}

.page {
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px) saturate(180%);
  border-radius: 28px;
  padding: 40px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  animation: fade-slide-up 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-title {
  font-size: 40px;
  font-weight: 700;
  background: linear-gradient(135deg, #2374e1 0%, #47a3ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 48px;
  text-align: center;
  letter-spacing: -0.03em;
}

.statistic {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
  padding: 0;
}

.statistic-detail {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 4px 20px rgba(71, 163, 255, 0.08),
    0 1px 3px rgba(71, 163, 255, 0.05);
}

.statistic-detail:hover {
  transform: translateY(-4px) scale(1.02);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 20px 40px rgba(71, 163, 255, 0.12),
    0 4px 12px rgba(71, 163, 255, 0.08);
}

.statistic-detail p:first-child {
  font-size: 15px;
  color: #6e6e73;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.statistic-detail p:last-child {
  font-size: 36px;
  background: linear-gradient(135deg, #2374e1 0%, #47a3ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.allocation {
  width: 100%;
  max-width: 1200px;
  margin-top: 40px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px) saturate(180%);
  border-radius: 28px;
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 40px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  animation: fade-slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
}

@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .body {
    padding: 80px 16px 30px;
  }
  
  .page, .allocation {
    padding: 24px;
    border-radius: 24px;
  }
  
  .page-title {
    font-size: 32px;
    margin-bottom: 32px;
  }
  
  .statistic {
    gap: 16px;
  }
  
  .statistic-detail {
    padding: 20px;
  }
  
  .statistic-detail p:last-child {
    font-size: 28px;
  }
  
  .allocation {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>