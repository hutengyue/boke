<template>
  <div id="china"></div>
</template>

<script setup>
import china from '../../assets/map/china.json'
import citys from '../../assets/js/citys.js'
import {onMounted, getCurrentInstance, reactive, toRefs, watch, toRef} from "vue";
const {proxy} = getCurrentInstance()
const props = defineProps({
  visitList:Array
})
const visitList = toRef(props,'visitList')
const option = reactive({
  legend: {
    data: []
  },
  tooltip: {
    show: false
  },
  geo: {
    map: "china",
    roam: false,// 一定要关闭拖拽
    zoom: 1.8,
    center: [105, 36], // 调整地图位置
    showLegendSymbol: false, // 存在legend时显示
    label: {
      show: false,
    },
    itemStyle: {
      areaColor: "white",
      borderColor: "#aeaeae",
      borderWidth: 0.5
    },
    emphasis: {
      label:{
        show: true
      },
      textStyle: {
        color: "#000000"
      },
      itemStyle:{
        areaColor: "#f6f6f6",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 5,
        borderWidth: 0
      }
    }
  },
  series: [{
    name: '博客访问来源( 今日 )', type: 'scatter', data: [],
    itemStyle: {
      shadowBlur: 0,
      shadowColor: '#333',
      color: '#01aaed',
      lineStyle: { color: '#01aaed' }
    },
    coordinateSystem: 'geo',
    symbolSize: 5,
    label: {
      formatter: '{b}',
      position: 'right',
      show: true,
      color: '#727272'
    },
  }]
})

function init(){
  let mapList = []
  const map = proxy.$echarts.init(document.getElementById('china'))
  visitList.value.forEach((item)=>{
    let location = item.location.replace('市','');
    if(citys[location]){
      mapList.push({name:location,value:citys[location]})
    }
  })
  console.log(mapList)
  option.series[0].data = mapList
  proxy.$echarts.registerMap('china', china);
  map.setOption(option, true);
  window.addEventListener("resize", function () {
    map.resize();
  });
}
onMounted(()=>{
  init()
})
</script>

<style scoped>
#china{
  display: flex;
  align-items: center;
  width:50%;
  height:400px;
}
</style>