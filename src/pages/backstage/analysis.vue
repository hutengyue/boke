<template>
  <div class="analysis">
    <div class="analysis__header">
      <h2>数据分析面板</h2>
      <div class="date-filter">
        <select v-model="timeRange">
          <option value="7">最近7天</option>
          <option value="30">最近30天</option>
          <option value="90">最近90天</option>
        </select>
      </div>
    </div>
    
    <div class="analysis__grid">
      <div class="stat-card">
        <h3>总访问量</h3>
        <div class="stat-value">{{ totalVisits }}</div>
        <div class="stat-chart" id="visitsChart"></div>
      </div>
      
      <div class="stat-card">
        <h3>用户增长</h3>
        <div class="stat-value">{{ totalUsers }}</div>
        <div class="stat-chart" id="usersChart"></div>
      </div>
      
      <div class="stat-card">
        <h3>文章数量</h3>
        <div class="stat-value">{{ totalArticles }}</div>
        <div class="stat-chart" id="articlesChart"></div>
      </div>
      
      <div class="stat-card">
        <h3>评论数量</h3>
        <div class="stat-value">{{ totalComments }}</div>
        <div class="stat-chart" id="commentsChart"></div>
      </div>
    </div>
    
    <div class="analysis__charts">
      <div class="chart-container">
        <h3>访问趋势</h3>
        <div id="trendChart" style="width: 100%; height: 400px;"></div>
      </div>
      
      <div class="chart-container">
        <h3>用户活跃度分布</h3>
        <div id="userActivityChart" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getCurrentInstance } from 'vue'
import { onBeforeUnmount } from 'vue'

const { proxy } = getCurrentInstance()

// 状态数据
const timeRange = ref('7')
const totalVisits = ref(0)
const totalUsers = ref(0)
const totalArticles = ref(0)
const totalComments = ref(0)

// 生成模拟数据
const generateMockData = (days) => {
  const data = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    data.push({
      date: date.toISOString().split('T')[0],
      visits: Math.floor(Math.random() * 1000),
      users: Math.floor(Math.random() * 100),
      articles: Math.floor(Math.random() * 10),
      comments: Math.floor(Math.random() * 50)
    })
  }
  return data
}

// 初始化图表
const initCharts = () => {
  const mockData = generateMockData(Number(timeRange.value))
  
  // 更新统计数据
  totalVisits.value = mockData.reduce((sum, item) => sum + item.visits, 0)
  totalUsers.value = Math.floor(totalVisits.value * 0.4)
  totalArticles.value = mockData.reduce((sum, item) => sum + item.articles, 0)
  totalComments.value = mockData.reduce((sum, item) => sum + item.comments, 0)
  
  // 销毁已存在的图表实例
  const existingTrendChart = proxy.$echarts.getInstanceByDom(document.getElementById('trendChart'))
  const existingUserActivityChart = proxy.$echarts.getInstanceByDom(document.getElementById('userActivityChart'))
  if (existingTrendChart) existingTrendChart.dispose()
  if (existingUserActivityChart) existingUserActivityChart.dispose()
  
  // 访问趋势图表
  const trendChart = proxy.$echarts.init(document.getElementById('trendChart'))
  trendChart.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: mockData.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '访问量',
      type: 'line',
      smooth: true,
      data: mockData.map(item => item.visits),
      areaStyle: {
        color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(58,77,233,0.8)'
        }, {
          offset: 1,
          color: 'rgba(58,77,233,0.1)'
        }])
      }
    }]
  })
  
  // 用户活跃度图表
  const userActivityChart = proxy.$echarts.init(document.getElementById('userActivityChart'))
  userActivityChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [{
      name: '用户活跃度',
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 40, name: '活跃用户' },
        { value: 30, name: '一般用户' },
        { value: 20, name: '偶尔访问' },
        { value: 10, name: '新用户' }
      ]
    }]
  })
}

// 监听时间范围变化
watch(timeRange, () => {
  initCharts()
})

// 处理窗口大小变化
const handleResize = () => {
  const trendChart = proxy.$echarts.getInstanceByDom(document.getElementById('trendChart'))
  const userActivityChart = proxy.$echarts.getInstanceByDom(document.getElementById('userActivityChart'))
  if (trendChart) trendChart.resize()
  if (userActivityChart) userActivityChart.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.analysis {
  padding: 20px;
}

.analysis__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.analysis__header h2 {
  margin: 0;
  color: #333;
}

.date-filter select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.analysis__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 16px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.analysis__charts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.chart-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chart-container h3 {
  margin: 0 0 20px 0;
  color: #333;
}
</style>