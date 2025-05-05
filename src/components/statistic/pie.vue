<script setup>
import {getCurrentInstance, toRef,onMounted,reactive,onUnmounted} from "vue";
const {proxy} = getCurrentInstance()
const props = defineProps({
  visitList:Array
})
const data = reactive({
  device:[
      {value:0,name:"PC端",},
      {value:0,name:"移动端"}
  ],
  browser:[]
})
const visitList = toRef(props,'visitList')
function getOption(data){
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      top: 'bottom',
      left: 'center',
      padding: [0, 0, 10, 0],
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 12,
        color: '#6e6e73'
      }
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '45%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          show: true,
          formatter: '{d}%',
          fontSize: 14,
          fontWeight: 500,
          color: '#1d1d1f'
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80
        },
        data: data
      }
    ]
  };
  return option;
}

let pie1Instance = null
let pie2Instance = null

onMounted(()=>{
  let array = []
  for(let i = 0;i < visitList.value.length;i++){
    if(visitList.value[i].device == "PC") data.device[0].value++
    else data.device[1].value++
    (array[visitList.value[i].browser] || (array[visitList.value[i].browser] = [])).push(visitList.value[i]);
  }
  for(let item in array){
    data.browser.push({name:item,value:array[item].length})
  }

  pie1Instance = proxy.$echarts.init(document.getElementById('pie1'))
  pie2Instance = proxy.$echarts.init(document.getElementById('pie2'))
  
  // 设置图表主题色
  const colors = ['#47a3ff', '#36cfc9', '#ff7875', '#ffc069', '#95de64'];
  pie1Instance.setOption({
    ...getOption(data.device),
    color: colors
  })
  pie2Instance.setOption({
    ...getOption(data.browser),
    color: colors
  })
  
  // 优化 resize 处理
  const resizeHandler = () => {
    pie1Instance && pie1Instance.resize()
    pie2Instance && pie2Instance.resize()
  }
  window.addEventListener("resize", resizeHandler)
  
  // 组件卸载时移除事件监听和销毁实例
  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler)
    if (pie1Instance) {
      pie1Instance.dispose()
      pie1Instance = null
    }
    if (pie2Instance) {
      pie2Instance.dispose()
      pie2Instance = null
    }
  })
})
</script>

<template>
  <div class="pieBox">
    <div class="chart-container device">
      <h3 class="chart-title">设备分布</h3>
      <div id="pie1"></div>
    </div>
    <div class="chart-container browser">
      <h3 class="chart-title">浏览器分布</h3>
      <div id="pie2"></div>
    </div>
  </div>
</template>

<style scoped>
.pieBox {
  width: 100%;
  height: 600px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
}

.chart-container {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 16px;
  height: 100%;
  box-shadow: 
    0 4px 20px rgba(71, 163, 255, 0.08),
    0 1px 3px rgba(71, 163, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 8px;
  padding-left: 12px;
  border-left: 3px solid #47a3ff;
}

#pie1, #pie2 {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
}

@media (max-width: 768px) {
  .pieBox {
    height: auto;
    min-height: 700px;
  }
  
  .chart-container {
    height: 340px;
  }
  
  #pie1, #pie2 {
    top: 40px;
  }
}
</style>