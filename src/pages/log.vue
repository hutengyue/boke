<script setup>
import {reactive,onMounted,getCurrentInstance} from "vue";
import Header from "../components/header.vue";
const {proxy} = getCurrentInstance()
const data = reactive({
  logList:[]
})
onMounted(()=>{
  proxy.$http.get('/log/all').then((res)=>{
    data.logList = [...res.data].reverse()
  })
})
</script>


<template>
  <Header style="z-index: 1000"></Header>
  <div class="body">
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">更新日志</h1>
        <p class="page-subtitle">记录每一次成长与进步</p>
      </div>
      <div class="container">
        <div class="timeline">
          <div class="timeline-item" v-for="(item,index) in data.logList" :key="index">
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
    </div>
  </div>
</template>

<style scoped>
.body {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 80px 20px 40px;
  background: linear-gradient(135deg, #f2f2f7 0%, #fff 100%);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", sans-serif;
}

.page {
  width: 100%;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 
    0 4px 24px -1px rgba(71, 163, 255, 0.15),
    0 0 1px 0 rgba(0, 0, 0, 0.05);
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-title {
  font-size: 40px;
  font-weight: 700;
  color: #47a3ff;
  margin-bottom: 12px;
  letter-spacing: -0.022em;
}

.page-subtitle {
  color: #8e8e93;
  font-size: 17px;
  font-weight: 500;
}

.timeline {
  position: relative;
  padding-left: 32px;
  border-left: 2px solid #47a3ff;
}

.timeline-item {
  margin-bottom: 40px;
  position: relative;
}

.item-circle::before {
  content: '';
  position: absolute;
  left: -41px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #47a3ff;
  box-shadow: 
    0 0 0 6px rgba(71, 163, 255, 0.15),
    0 0 20px rgba(71, 163, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-item:hover .item-circle::before {
  transform: translateY(-50%) scale(1.2);
  box-shadow: 
    0 0 0 8px rgba(71, 163, 255, 0.2),
    0 0 30px rgba(71, 163, 255, 0.3);
}

.timeline-item-title {
  margin-bottom: 16px;
}

.item-circle p {
  color: #47a3ff;
  font-size: 13px;
  font-weight: 600;
  font-family: "SF Mono", SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.5px;
  opacity: 0.9;
}

.timeline-item-content {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 
    0 2px 12px rgba(71, 163, 255, 0.1),
    0 0 1px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(71, 163, 255, 0.15);
}

.timeline-item-content:hover {
  transform: translateY(-2px) translateX(4px);
  box-shadow: 
    0 8px 24px rgba(71, 163, 255, 0.15),
    0 2px 8px rgba(71, 163, 255, 0.1);
  border-color: #47a3ff;
}

.timeline-item-content p {
  color: #1d1d1f;
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  font-weight: 450;
  letter-spacing: -0.022em;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>