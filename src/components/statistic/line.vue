<template>
  <div id="main"></div>
</template>

<script setup>
import {onMounted, getCurrentInstance, reactive, toRefs, watch, toRef} from "vue";
import moment from "moment";
const {proxy} = getCurrentInstance()
const props = defineProps({
  lineData:Object
})
const line = toRef(props,'lineData')
const data = reactive({
  ipList:[],
  numberList:[]
})

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
      data.ipList.push(line.value[index].ip)
      data.numberList.push(line.value[index].number)
      index++
    }else{
      data.ipList.push(0)
      data.numberList.push(0)
    }

  }
  const visit = proxy.$echarts.init(document.getElementById('main'))
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
        data: data.ipList
      },
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
        data: data.numberList
      }
    ]
  };
  visit.setOption(option)
  window.addEventListener("resize", function () {
    visit.resize();
  });
})
</script>

<style scoped>
#main{
  margin-top: 50px;
  height: 300px;
  width: 100%;
  max-width: 1280px;
  margin-bottom: 30px;
}
</style>