<template>
  <div class="message-container">
    <div class="body">
      <img class="bkg" v-lazy="bkg" alt="">
      <Header class="header"></Header>
      
      <!-- 视图切换按钮 -->
      <div class="view-toggle">
        <button 
          :class="{ active: viewMode === 'danmu' }" 
          @click="viewMode = 'danmu'"
        >
          <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4z"/>
          </svg>
          弹幕
        </button>
        <button 
          :class="{ active: viewMode === 'list' }" 
          @click="viewMode = 'list'"
        >
          <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          列表
        </button>
      </div>

      <!-- 弹幕视图 -->
      <Danmaku 
        v-show="viewMode === 'danmu'"
        ref="danmakuRef" 
        class="danmuBox"
        :debounce="400" 
        :randomChannel="true"
        :danmus="data.danmus" 
        loop 
        useSlot
        useSuspendSlot 
        :channels="0" 
        :speeds="150"
      >
        <template #dm="{ danmu }">
          <div class="danmu">
            <img class="danmuImg" v-if="danmu.avatar" :src="danmu.avatar" alt="">
            <div class="danmuText">{{ danmu.text }}</div>
          </div>
        </template>
      </Danmaku>

      <!-- 列表视图 -->
      <div v-show="viewMode === 'list'" class="message-list">
        <div class="message-waterfall">
          <div v-for="message in data.messages" :key="message.messageId" class="message-item">
            <div class="message-header">
              <img :src="message.headImg" :alt="message.username" class="avatar">
              <div class="message-info">
                <div class="username">{{ message.username }}</div>
                <div class="time">{{ formatTime(message.createAt) }}</div>
              </div>
            </div>
            <div class="message-content" :class="{ 'is-expanded': message.isExpanded }">
              <div class="content-text">{{ message.content }}</div>
              <button 
                v-if="message.content.length > 50" 
                class="expand-btn"
                @click="message.isExpanded = !message.isExpanded"
              >
                {{ message.isExpanded ? '收起' : '展开全文' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入框部分 -->
      <div class="fireBox">
        <div class="message-input">
          <input 
            @keyup.enter="fire" 
            v-model="data.text" 
            type="text" 
            placeholder="分享你的想法..." 
            maxlength="20"
          >
          <button @click="fire()">
            <svg class="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-container {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  height: 100vh;
  width: 100%;
  background: #000;
  color: #fff;
  overflow: hidden;
}

.body {
  height: 100vh;
  width: 100%;
  position: fixed;
}

.bkg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.header {
  position: relative;
  z-index: 100;
}

.view-toggle {
  position: fixed;
  top: 80px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 4px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.view-toggle button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-toggle button.active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.toggle-icon {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.message-list {
  position: relative;
  height: calc(100vh - 180px);
  overflow-y: auto;
  padding: 16px;
  margin: 70px 16px 90px;
  z-index: 1;
}

.message-waterfall {
  column-count: 3;
  column-gap: 16px;
  padding: 10px;
}

@media (max-width: 1200px) {
  .message-waterfall {
    column-count: 2;
  }
}

@media (max-width: 768px) {
  .message-waterfall {
    column-count: 1;
  }
}

.message-item {
  break-inside: avoid;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
}

.message-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px) translateZ(0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.message-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.message-info {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}

.time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.message-content {
  position: relative;
}

.content-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  transition: all 0.3s ease;
}

.message-content.is-expanded .content-text {
  -webkit-line-clamp: unset;
}

.expand-btn {
  background: none;
  border: none;
  color: #0071e3;
  font-size: 12px;
  padding: 4px 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  margin-top: 4px;
}

.expand-btn:hover {
  opacity: 0.8;
}

.fireBox {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
}

.message-input {
  display: flex;
  gap: 8px;
  align-items: center;
}

.message-input input {
  flex: 1;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  font-size: 15px;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
}

.message-input input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.message-input input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.message-input button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: #0071e3;
  cursor: pointer;
  transition: all 0.3s ease;
}

.message-input button:hover {
  background: #0077ed;
  transform: translateY(-1px);
}

.send-icon {
  width: 20px;
  height: 20px;
  stroke: #fff;
}

.danmuBox {
  height: calc(100% - 70px);
  padding: 20px;
  margin-top: 60px;
  transition: opacity 0.3 ease;
}

.danmu {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.danmu:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.15);
}

.danmuImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.danmuText {
  color: rgba(255, 255, 255, 0.9);
  font-size: 17px;
  margin-left: 8px;
  font-weight: 400;
}

:deep(.el-message) {
  background: rgba(28, 28, 30, 0.95) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  padding: 12px 20px !important;
}

:deep(.el-message .el-message__content) {
  color: #fff !important;
  font-size: 14px !important;
  font-weight: 400 !important;
}

@media (max-width: 768px) {
  .view-toggle {
    top: 70px;
    right: 10px;
  }

  .message-list {
    margin: 60px 10px 80px;
    padding: 10px;
  }

  .fireBox {
    bottom: 10px;
    padding: 10px;
  }

  .message-input input {
    font-size: 14px;
    padding: 10px 14px;
  }

  .message-input button {
    width: 36px;
    height: 36px;
  }
}
</style>

<script setup>
import Header from "../components/header.vue";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import { ElMessage } from 'element-plus'
const {proxy} = getCurrentInstance()
const danmakuRef = ref(null)
const bkg = proxy.$utils.getAssetsImg("liuyan.jpg")
const viewMode = ref('danmu') // 添加视图模式的响应式变量
var data = reactive({
  danmus: [],
  messages: [], // 添加messages数组
  text:''
})

function formatTime(time) {
  return new Date(time).toLocaleString()
}

function fire(){
  if(data.text.trim() == ""){
    ElMessage.error('发言为空')
  }else {
    proxy.$http.post("/message/send", {content:data.text}).then(res=>{
      console.log(res.data)
      const newMessage = {
        avatar: res.data.headImg,
        text: res.data.content,
      }
      data.danmus.push(newMessage)
      data.messages.push({
        headImg: res.data.headImg,
        username: res.data.username,
        content: res.data.content,
        createAt: new Date(),
        messageId: Date.now()
      })
    })
  }
  data.text = ""
}

// 修改 addToList 函数，添加 isExpanded 属性
function addToList(list) {
  list.forEach((v) => {
    data.danmus.push({
      avatar: v.headImg,
      text: v.content,
    });
    data.messages.push({
      headImg: v.headImg,
      username: v.username,
      content: v.content,
      createAt: v.createAt,
      messageId: v.messageId,
      isExpanded: false // 添加展开状态控制
    });
  });
  danmakuRef.value.play()
}
onMounted(()=>{
  proxy.$http.get('/message').then(res=>{
    var list = res.data
    addToList(list)
  })
})
</script>
