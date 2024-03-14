<template>
  <div class="pieBox">
    <div class="device">
      <p>设备</p>
      <div id="pie1"></div>
    </div>
    <div class="browser">
      <p>浏览器</p>
      <div id="pie2"></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted,getCurrentInstance,reactive} from "vue";
const {proxy} = getCurrentInstance()
const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '移动端' },
        { value: 735, name: 'PC端' }
      ]
    }
  ]
};
const option1 = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'chrome浏览器' },
        { value: 300, name: 'edge浏览器' },
        { value: 500,name:'搜狗浏览器'}
      ]
    }
  ]
};
onMounted(()=>{
  const pie1 = proxy.$echarts.init(document.getElementById('pie1'))
  const pie2 = proxy.$echarts.init(document.getElementById('pie2'))
  pie1.setOption(option)
  pie2.setOption(option1)
})
</script>

<style scoped>
.pieBox{
  width: 30%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.device,.browser{
  width: 100%;
  height: 100%;
}
#pie1{
  height: 100%;
  width: 100%;
}
#pie2{
  height: 100%;
  width: 100%;
}
</style>