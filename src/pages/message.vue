<template>
  <div>
    <div class="bcg">
      <Header class="header"></Header>
      <div class="fireBox">
        <p>留言板</p>
        <div class="fire">
          <input @keyup.enter="fire" v-model="data.text" type="text" placeholder="留下点什么吧~" maxlength="20">
          <button @click="fire()">发射</button>
        </div>
      </div>
      <Danmaku ref="danmakuRef" class="danmuBox"
               :debounce="400" :randomChannel="true"
               :danmus="data.danmus" loop useSlot
               useSuspendSlot :channels="0" :speeds="150">
        <template #dm="{ danmu, index }">
          <div class="danmu">
            <img class="danmuImg" v-if="danmu.avatar" :src="danmu.avatar" alt="">
            <div class="danmuText">{{ danmu.text }}</div>
<!--            <div class="item" @click="handleAdd(danmu)">➕</div>-->
<!--            <div class="item" @click="handleIndex(index)">👍</div>-->
          </div>
        </template>
      </Danmaku>
    </div>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
export default {
  name: "message",
  setup(){
    const {proxy} = getCurrentInstance()
    const danmakuRef = ref(null)
    var data = reactive({
      danmus: [],
      text:''
    })

    function fire(){
      if(data.text.trim() == ""){
        ElMessage.error('发言为空')
      }else {
        proxy.$http({
          method:"POST",
          url:"/message/send",
          data:{message:data.text}
        }).then(res=>{
          if(res.data.type == "success"){
            data.danmus.push({
              avatar: 'data:image/png;base64,'+res.data.headImg,
              text: res.data.text,
            });
          }
          return ElMessage({
            message: res.data.msg,
            type: res.data.type
          })
        })
      }
      data.text = ""
    }

    function addToList(list) {
      list.forEach((v) => {
        data.danmus.push({
          avatar: v.headImg,      		//头像
          text: v.message,             	//弹幕消息
        });
      });
      danmakuRef.value.play()
    }

    onMounted(()=>{
      proxy.$http({
        method:"GET",
        url:"/message"
      }).then(res=>{
        var list = res.data
        list.forEach((item,index)=>{
          item.headImg = 'data:image/png;base64,' + item.headImg
        })
        addToList(list)
      })
    })

    return{
      data,
      fire,
      danmakuRef
    }
  },
  components:{
    Header
  }
}
</script>

<style scoped>
@keyframes zhuye {
  from{
    opacity: 0;
    transform: translate(0px,-50px);
  }
  to{
    opacity: 1;
    transform: translate(0px,0px);
  }
}
.header{
  position: relative;
  z-index: 100;
}
.bcg{
  animation: zhuye 1s ease 0s 1 normal none running;
  height: 100vh;
  width: 100%;
  background: url("../assets/image/liuyan.jpg") no-repeat;
  position: fixed;
  background-size: cover;
  z-index: -100000;
}
.fireBox{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  width: 100%;
  height: 100%;
}
.fireBox p{
  color: white;
  font-size: 40px;
  margin-bottom:20px;
}
.fire{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.fire input{
  color: white;
  background-color: transparent;
  font-size: 20px;
  padding: 10px;
  border: 2px solid white;
  border-radius: 20px;
  outline: none;
  margin-right: 10px;
}
.fire input::-webkit-input-placeholder{
  color: white;
}
.fire button{
  padding: 10px;
  border-radius: 20px;
  color: white;
  font-size: 20px;
  border: 2px solid white;
  background-color: transparent;
  outline: none;
}
.danmuBox{
  height: calc(100% - 70px);
}
.danmu{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  background-color: rgba(0,0,0,0.7);
  border-radius: 30px;
}
.danmuImg{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.danmuText{
  color: white;
  font-size: 22px;
  margin-left: 10px;
}
:deep(.el-message .el-message__content){
  font-size: 60px !important;
}
</style>