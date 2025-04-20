<template>
  <div id="main"></div>
</template>

<script setup>
import {onMounted, getCurrentInstance, reactive, toRefs, watch, toRef,onUnmounted} from "vue";
import moment from "moment";
const {proxy} = getCurrentInstance()
const props = defineProps({
  lineData:Object
})
const line = toRef(props,'lineData')
let ipList = []
let numberList = []

function getDate(index = 0) {
  var yesterday = moment().subtract(index, 'days');
  var year = yesterday.format('YYYY');
  var month = yesterday.format('MM');
  var day = yesterday.format('DD');
  return year + "-" + month + "-" + day
}
onMounted(()=>{
  const day = [getDate(6), getDate(5), getDate(4), getDate(3), getDate(2), getDate(1), getDate()]
  let index = 0
  for(let i = 0;i < 7;i++){
    if(day[i] == line.value[index].name){
      ipList.push(line.value[index].ip)
      numberList.push(line.value[index].number)
      index++
    }else{
      ipList.push(0)
      numberList.push(0)
    }
  }
  console.log(ipList,numberList)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['今日ip数', '今日浏览量']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: day
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '今日浏览量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: numberList
      },
      {
        name: '今日ip数',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: ipList
      }
    ]
  };
  const visit = proxy.$echarts.init(document.getElementById('main'))
  visit.setOption(option)
  
  // 优化 resize 处理
  const resizeHandler = () => {
    visit.resize()
  }
  window.addEventListener("resize", resizeHandler)
  
  // 组件卸载时移除事件监听
  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler)
  })
})
</script>

<style scoped>
#main {
  margin: 20px 0 40px;
  height: 360px;
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 
    0 4px 20px rgba(71, 163, 255, 0.08),
    0 1px 3px rgba(71, 163, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

#main:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 8px 30px rgba(71, 163, 255, 0.12),
    0 2px 8px rgba(71, 163, 255, 0.08);
}
</style>