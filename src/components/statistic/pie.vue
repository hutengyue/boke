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
import {getCurrentInstance, toRef,onMounted,reactive} from "vue";
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
        data: data
      }
    ]
  };
  return option
}
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

  const pie1 = proxy.$echarts.init(document.getElementById('pie1'))
  const pie2 = proxy.$echarts.init(document.getElementById('pie2'))
  pie1.setOption(getOption(data.device))
  pie2.setOption(getOption(data.browser))
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