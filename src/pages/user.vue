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
import {getCurrentInstance, onMounted, reactive} from "vue";
import useStore from "../store/index.js";
const {proxy} = getCurrentInstance()
const store = useStore()
var user = reactive({
  userId:'',
  username:'',
  sex:'',
  email:'',
  introduction:'',
  headImg:''
})
function init(){
  if(store.getToken != ''){
    proxy.$http.get('/user').then(res => {
      var resData = res.data
      if(resData.type == "success"){
        user.userId = resData.user[0].userId.toString()
        user.username = resData.user[0].username
        user.sex = resData.user[0].sex.toString()
        user.email = resData.user[0].email
        user.introduction = resData.user[0].introduction
        user.headImg = 'data:image/png;base64,' + resData.user[0].headImg
        store.setHeadImg(user.headImg)
        proxy.$bus.emit('headImg')
      }
    })
  }
}

onMounted(()=>{
  init()
})
</script>

<style scoped>

</style>