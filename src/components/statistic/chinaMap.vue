<template>
  <div class="map-container">
    <h3 class="chart-title">访问分布</h3>
    <div id="china"></div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 
    0 4px 20px rgba(71, 163, 255, 0.08),
    0 1px 3px rgba(71, 163, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.map-container:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 8px 30px rgba(71, 163, 255, 0.12),
    0 2px 8px rgba(71, 163, 255, 0.08);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

#china {
  width: 100%;
  height: calc(100% - 40px);
  min-height: 400px;
}
</style>

<script setup>
import china from '../../assets/map/china.json'
import citys from '../../assets/js/citys.js'
import {onMounted,onUnmounted, getCurrentInstance, reactive, toRefs, watch, toRef} from "vue";
const {proxy} = getCurrentInstance()
const props = defineProps({
  visitList:Array
})
const visitList = toRef(props,'visitList')
let mapInstance = null // 添加实例引用

function init(){
  let mapList = []
  mapInstance = proxy.$echarts.init(document.getElementById('china'))
  visitList.value.forEach((item)=>{
    let location = item.location.replace('市','');
    if(citys[location]){
      mapList.push({name:location,value:citys[location]})
    }
  })
  option.series[0].data = mapList
  proxy.$echarts.registerMap('china', china);
  mapInstance.setOption(option, true);
  const resizeHandler = () => {
    mapInstance && mapInstance.resize()
  }
  window.addEventListener("resize", resizeHandler)
  
  // 组件卸载时移除事件监听和销毁实例
  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler)
    if (mapInstance) {
      mapInstance.dispose()
      mapInstance = null
    }
  })
}
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

onMounted(()=>{
  init()
})
</script>