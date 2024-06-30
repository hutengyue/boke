<template>
  <div>
    <Header style="z-index: 1000"></Header>
    <div v-if="!user.userId">
      <SignInUp/>
    </div>
    <div v-if="user.userId">
      <UserInfo :user="user"/>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/header.vue";
import SignInUp from "../components/signInUp.vue";
import UserInfo from "../components/userInfo.vue";
import {getCurrentInstance, onMounted, reactive,ref} from "vue";
import useStore from "../store/index.js";
const {proxy} = getCurrentInstance()
const store = useStore()
var user = ref({})
function init(){
  if(store.getToken != ''){
    proxy.$http.get('/user').then(res => {
      user.value = res.data
      store.setHeadImg(user.value.headImg)
      proxy.$bus.emit('headImg')
    })
  }
}

onMounted(()=>{
  init()
})
</script>

<style>
@font-face {
  font-family: rain;
  src: url("../assets/wenzi.ttf");
}
*{
  font-family: rain;
}
</style>