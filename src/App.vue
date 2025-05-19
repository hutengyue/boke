<script setup>
import Tool from './components/tool/index.vue'
import {onMounted,getCurrentInstance} from "vue";
import {useRouter} from 'vue-router';
import cookie from "js-cookie";
import useStore from "./store";
const {proxy} = getCurrentInstance()
const store = useStore()
const router = useRouter()

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

onMounted(()=>{
  window.addEventListener('storage', (e) => {
    localStorage.setItem(e.key, e.oldValue);
  });

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

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  let flag = !cookie.get('visit')?true:false
  proxy.$http({
    url:'/visit',
    method:'POST',
    data:{
      flag:flag,
      city:store.getCity||cookie.get('visit'),
      device:isMobile?'MB':'PC',
      browser:proxy.$utils.browserType()
    }
  }).then((res)=>{
    if(flag == true){
      store.setCity(res.data.map.city)
      cookie.set('visit',res.data.map.city,{expires:0.25})
    }
  })
})
</script>

<template>
  <router-view></router-view>
  <Tool></Tool>
</template>

<style scoped>

</style>


