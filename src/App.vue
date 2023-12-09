<script setup>
import {onMounted} from "vue";

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
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
