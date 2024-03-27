<script setup>
import {onMounted,getCurrentInstance} from "vue";
import musicPlayer from './components/musicPlayer.vue'
import cookie from "js-cookie";
import useStore from "./store";
const {proxy} = getCurrentInstance()
const store = useStore()

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

onMounted(()=>{
  document.title = "cavalry"
  document.addEventListener("visibilitychange", ()=>{
    if (document.hidden === true) {
      document.title = "不要离开我😭"
    }else{
      document.title = "欢迎回来😊"
      setTimeout(()=>{
        document.title = "cavalry"
      },3000)
    }
  });
  let flag = !cookie.get('visit')?true:false
  proxy.$http({
    url:'/visit',
    method:'POST',
    data:{
      flag:flag,
      city:store.getVisit.city||cookie.get('visit'),
      device:isMobile?'MB':'PC',
      browser:proxy.$utils.browserType()
    }
  }).then((res)=>{
    if(flag == true){
      store.setVisit({
        ip:res.data.ip,
        city:res.data.map.city
      })
      cookie.set('visit',res.data.map.city,{expires:0.25})
    }
  })
})
</script>

<template>
  <router-view></router-view>
  <musicPlayer/>
</template>

<style scoped>

</style>
