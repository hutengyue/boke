<script setup>
import Header from "../components/header.vue";
import * as THREE from 'three'
import CLOUDS from 'vanta/src/vanta.clouds'
import {ref, onMounted, reactive, getCurrentInstance,nextTick,onBeforeUnmount} from "vue";
import {io} from 'socket.io-client'
import {ElMessage} from "element-plus";
import useStore from "../store/index.js";
import {useRouter} from "vue-router";
import global from "../util/global.js";

const {proxy} = getCurrentInstance()
//背景
const background = ref(null)
let vantaEffect = null
const store = useStore()
const router = useRouter()
//个人id
let userId = ref(null)
//选择聊天
const activeMenu = ref('chat')
const messageInput = ref('')

// 通知相关
const applys = ref([])
const applyCount = ref(0)

//当前聊天
const currentChat = reactive({
  id:'',
  type:'',
  name: '',
  introduction: '',
  headImg:'',
  messages: []
})
//消息列表
let chatList = ref([])

// 群聊消息列表
const groupMessages = reactive([])

// 好友列表
const friendsList = ref([])

// 搜索用户相关
const searchText = ref('')
const searchResults = ref([])

// 搜索用户
const searchUsers = () => {
  if (!searchText.value.trim()) {
    ElMessage.warning('请输入搜索内容')
    return
  }
  proxy.$http.post('/user/searchByUsername',{username:searchText.value}).then(res => {
    if(res.data){
      searchResults.value = [res.data]
    }else{
      searchResults.value = []
    }
  })
}

const showFriendList = () => {
  proxy.$http.get(`/friend/${userId.value}`).then(res=>{
    friendsList.value = res.data
  })
}

// 添加好友
const addFriend = (toId) => {
  ws.emit('apply', {
    toId,
    fromId:userId.value
  })
}

// 处理好友请求
const handleFriendRequest = (apply, status) => {
  ws.emit('handle', {
    fromId: apply.fromId,
    toId: apply.toId,
    applyId:apply.applyId,
    status
  })
}

// WebSocket连接
let ws = null

// 发送消息
const sendMessage = () => {
  if (!messageInput.value.trim()) return
  
  if(currentChat.type === 'group'){
    const data = {
      userId: userId.value,
      groupId: currentChat.id,
      message: messageInput.value,
    }
    ws.emit('groupMessage', data)
  } else if(currentChat.type === 'private') {
    const data = {
      fromId: userId.value,
      toId: currentChat.id,
      message: messageInput.value
    }
    console.log(data)
    ws.emit('privateMessage', data)
  }
  messageInput.value = ''
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.message-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

// 搜索好友
const searchFriends = () => {
  if (!searchText.value) return
  // TODO: 实现搜索逻辑
}

const selectTarget = async(target) => {

  if(target.type == 'group' && target.type){
    currentChat.type = target.type
    currentChat.id = target.id
    currentChat.name = target.name
    currentChat.introduction = target.introduction
    currentChat.headImg = target.headImg
    let result = await proxy.$http.get(`/gmessage/group/${target.id}?pageNo=${1}&pageSize=${20}`)
    currentChat.messages = result.data
  }else{
    currentChat.type = 'private'
    currentChat.id = target.userId || target.id
    currentChat.name = target.username || target.name
    currentChat.introduction = target.introduction
    currentChat.headImg = target.headImg
    let result = await proxy.$http.get(`/pmessage/history?userId1=${userId.value}&userId2=${currentChat.id}&pageNo=${1}&pageSize=${20}`)
    console.log(result.data)
    currentChat.messages = result.data
  }
  nextTick(() => {
    scrollToBottom()
  })
}

const initApplys = () => {
  proxy.$http.get(`/apply?userId=${userId.value}`).then(res=>{
    applys.value = res.data
    applyCount.value = applys.value.filter(apply => apply.status === 'wait').length
  })
}
// 生命周期钩子
onMounted(() => {
  // 初始化背景效果
  vantaEffect = CLOUDS({
    el: background.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    speed: 1.5,
    THREE: THREE
  })
  proxy.$http({
    url:'/user',
    method:'get',
  }).then(res => {
    userId.value = res.data.userId
    initWebSocket()
  })
})

// 监听消息输入框回车事件
const handleKeyPress = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

function initWebSocket(){
  if(window.WebSocket){
    ws = io(`ws://${global.websocketUrl}`)
    ws.emit('connection',{userId:userId.value})

    ws.on('connection',async(data)=>{
      data.message.forEach((item)=>{
        if(item.type == 'group'){
          chatList.value.push({
            type:'group',
            id:item.groupId,
            name:item.group.groupName,
            headImg:item.group.headImg,
            message:item.message,
            createAt:item.createAt,
            introduction:item.group.introduction
          })
        }else{
          chatList.value.push({
            type:'private',
            id:item.userId,
            name:item.username,
            headImg:item.headImg,
            message:item.message,
            createAt:item.createAt,
            introduction:item.introduction
          })
        }
      })
      //选择首个对象
      selectTarget(chatList.value[0])
      currentChat.number = data.number || null
      
      nextTick(() => {
        initApplys()
        showFriendList()
        scrollToBottom()
      })
    })

    ws.on('groupMessage',(data)=>{
      if(currentChat.type == 'group'){
        currentChat.messages.push(data)
        chatList.value[0].message = data.message
        scrollToBottom()
      }
    })


    ws.on('apply',(data)=>{
      if(data.type == 'success') initApplys()
    })

    ws.on('handle',(data)=>{
      if(data.type == 'success') showFriendList()
    })

    ws.on('quit',(data)=>{
      currentChat.number = data
    })

    ws.on('disconnect',()=>{
    })

    ws.on('privateMessage',(data)=>{
      if(currentChat.type == 'private' && currentChat.id == data.fromId){
        currentChat.messages.push(data)
        scrollToBottom()
      }
    })
  }
}



onBeforeUnmount(() => {
  // 清理WebSocket连接
  if (ws) {
    ws.emit('quit',{userId:userId.value})
    ws.disconnect()
    ws = null
  }
  
  // 清理背景效果
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})

</script>

<template>
<div>
  <Header style="z-index: 1000"></Header>
  <div class="all" ref="background">
    <div class="chat-container">
      <!-- 左侧菜单 -->
      <div class="side-menu">
        <div class="user-profile">
          <img :src="store.getHeadImg" class="avatar" alt="用户头像">
          <span class="username">{{store.getUsername}}</span>
        </div>
        <div class="menu-items">
          <div class="menu-item" :class="{ active: activeMenu === 'chat' }" @click="activeMenu = 'chat';selectTarget(chatList[0])">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span>聊天</span>
          </div>
          <div class="menu-item" :class="{ active: activeMenu === 'friends' }" @click="activeMenu = 'friends';selectTarget(friendsList[0])">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>好友</span>
          </div>
          <div class="menu-item" :class="{ active: activeMenu === 'add' }" @click="activeMenu = 'add'">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span>添加</span>
          </div>
          
          <div class="menu-item" :class="{ active: activeMenu === 'notifications' }" @click="activeMenu = 'notifications'">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span>通知</span>
            <div v-if="applyCount > 0" class="notification-badge">{{ applyCount }}</div>
          </div>
          
        </div>
      </div>

      <!-- 中间列表区域 -->
      <div class="list-container">
        <!-- 聊天列表 -->
        <div v-if="activeMenu === 'chat'" class="chat-list">
          <div class="search-bar">
            <input type="text" placeholder="搜索聊天...">
          </div>
          <div class="list-content">
            <div @click="selectTarget(item)" v-for="(item,index) in chatList" :key="index" class="chat-list-item" :class="{'active': currentChat.id === item.id && currentChat.type === item.type}">
              <div class="chat-avatar">
                <img :src="item.headImg" alt="群组头像">
                <div class="status-badge online"></div>
              </div>
              <div class="chat-info">
                <div class="chat-name">{{ item.name }}</div>
                <div class="chat-preview">{{item.message}}</div>
              </div>
              <div class="chat-meta">
                <span class="time">{{ item.createAt }}</span>
                <!-- <div class="unread">1</div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- 好友列表 -->
        <div v-if="activeMenu === 'friends'" class="friends-list">
          <div class="search-bar">
            <input type="text" v-model="searchText" placeholder="搜索好友..." @keyup.enter="searchFriends">
          </div>
          <div class="list-content">
            <div v-for="friend in friendsList" :key="friend.userId" class="chat-list-item" :class="{'active': currentChat.id === friend.userId && currentChat.type === 'private'}" @click="selectTarget(friend)">
              <div class="chat-avatar">
                <img :src="friend.headImg" alt="好友头像">
                <div class="status-badge online"></div>
              </div>
              <div class="chat-info">
                <div class="chat-name">{{ friend.username }}</div>
                <div class="chat-preview">{{ friend.introduction || '暂无简介' }}</div>
              </div>
            </div>
            <div v-if="friendsList.length === 0" class="empty-state">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" fill="none" stroke-width="2"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" fill="none" stroke-width="2"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" fill="none" stroke-width="2"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" fill="none" stroke-width="2"/>
              </svg>
              <p>暂无好友</p>
            </div>
          </div>
        </div>

        <!-- 添加好友/群组 -->
        <div v-if="activeMenu === 'add'" class="add-section">
          <div class="search-container">
            <div class="search-header">
              <input 
                v-model="searchText" 
                type="text" 
                placeholder="输入用户名搜索..." 
                @keyup.enter="searchUsers"
                class="search-input"
              >
              <button @click="searchUsers" class="search-btn" title="搜索用户">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>
            
            <div class="search-results" v-if="searchResults.length > 0">
              <div v-for="user in searchResults" :key="user.id" class="user-card">
                <img :src="user.headImg" alt="用户头像" class="user-avatar">
                <div class="user-info">
                  <div class="user-name">{{user.username}}</div>
                  <div class="user-bio">{{user.introduction}}</div>
                </div>
                <button class="add-btn" @click="addFriend(user.userId)">
                  <span>添加</span>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-else="searchText" class="no-results">
              <div class="empty-state">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                <p>未找到相关用户</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 通知列表 -->
                 <!-- 通知列表 -->
        <div v-if="activeMenu === 'notifications'" class="notifications-section">
          <div class="notifications-container">
            <div class="notifications-header">
              <h3>通知中心</h3>

            </div>
            
            <div class="notifications-list" v-if="applys.length > 0">
              <div v-for="apply in applys" :key="apply.applyId" class="notification-item">
                <div class="notification-avatar">
                  <img :src="apply.from.headImg" alt="头像">
                </div>
                <div class="notification-content">
                  <div class="notification-header">
                    <span class="notification-title">{{ apply.from.username }}</span>
                    <span class="notification-time">{{ apply.createAt }}</span>
                  </div>
                  <p class="notification-message">申请与你成为好友</p>
                </div>
                <div class="notification-actions">
                  <template v-if="apply.status === 'wait'">
                    <button class="accept-btn" @click="handleFriendRequest(apply, 'yes')">接受</button>
                    <button class="reject-btn" @click="handleFriendRequest(apply, 'no')">拒绝</button>
                  </template>
                  <span v-else-if="apply.status === 'yes'" class="status-text accepted">已接受</span>
                  <span v-else-if="apply.status === 'no'" class="status-text rejected">已拒绝</span>
                </div>
              </div>
            </div>
            
            <div v-else class="empty-notifications">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" fill="none" stroke-width="2"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" fill="none" stroke-width="2"/>
              </svg>
              <p>暂无通知</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧聊天区域 -->
      <div class="chat-area">
        <div class="chat-header">
          <div class="chat-title">
            <div class="title-info">
              <span class="title">{{currentChat.name}}</span>
              <div v-if="currentChat.type == 'group'" class="online-count">
                <div class="dot"></div>
                <span >{{currentChat.number}} 人在线</span>
              </div>
            </div>
            <span class="subtitle">{{currentChat.introduction}}</span>
          </div>
        </div>
        <div class="message-container">
          <div v-for="(item, index) in currentChat.messages" :key="index" 
               :class="[item.user.userId == userId ? 'message-right' : 'message-left']">
            <div class="message-item">
              <img :src="item.user.headImg" class="message-avatar" @click="viewProfile(item.user)">
              <div class="message-content">
                <div class="message-info">
                  <span class="message-name">{{ item.user.username }}</span>
                  <span class="message-time">{{ item.createAt }}</span>
                </div>
                <div class="message-text">{{ item.message }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="input-area">
          <!-- <div class="toolbar">
            <button class="tool-btn" title="发送图片">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="4" ry="4"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </button>
            <button class="tool-btn" title="发送文件">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </button>
          </div> -->
          <div class="message-input">
            <input 
              type="text" 
              v-model="messageInput"
              placeholder="输入消息..."
              @keypress="handleKeyPress"
            >
            <button class="send-btn" @click="sendMessage">
              <span>发送</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13"/>
                <path d="M22 2L15 22L11 13L2 9L22 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.all {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  position: relative;
  height: 100vh;
  background: #f5f5f7;
}

.chat-container {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin: 20px 150px 50px 150px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.side-menu {
  width: 150px;
  background: rgba(255, 255, 255, 0.9);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.user-profile {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 15px;
  font-weight: 500;
  color: #1d1d1f;
}

.menu-items {
  padding: 8px;
}

.menu-item {
  display: flex;
  position: relative;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  color: #1d1d1f;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.menu-item.active {
  background: rgba(0, 113, 227, 0.1);
  color: #0071e3;
}

.menu-item svg {
  width: 20px;
  height: 20px;
}

.list-container {
  width: 260px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(250, 250, 250, 0.8);
}

.search-bar {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.search-bar input {
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  font-size: 14px;
  outline: none;
}

.friend-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.friend-item:hover {
  background: rgba(0, 0, 0, 0.02);
}

.friend-avatar {
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
}

.friend-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.friend-info {
  flex: 1;
}

.friend-name {
  font-size: 15px;
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 4px;
}

.friend-bio {
  font-size: 13px;
  color: #86868b;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #86868b;
}

.empty-state svg {
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 14px;
  text-align: center;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.chat-header {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.chat-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.title-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  letter-spacing: -0.2px;
}

.online-count {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(52, 199, 89, 0.1);
  border-radius: 20px;
  font-size: 13px;
  color: #34c759;
}

.dot {
  width: 6px;
  height: 6px;
  background: #34c759;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.subtitle {
  font-size: 14px;
  color: #86868b;
  line-height: 1.4;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.message-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f5f5f7;
}

.message-left, .message-right {
  display: flex;
  margin-top: 20px;
  width: 100%;
}

.message-item {
  display: flex;
  gap: 12px;
  max-width: 80%;
}

.message-left .message-item {
  flex-direction: row;
}

.message-right {
  justify-content: flex-end;
}

.message-right .message-item {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.message-content {
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 52px);
}

.message-info {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.message-right .message-info {
  flex-direction: row-reverse;
}

.message-name {
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
}

.message-time {
  font-size: 12px;
  color: #86868b;
}

.message-text {
  background: #fff;
  padding: 12px 16px;
  border-radius: 16px 16px 16px 4px;
  font-size: 14px;
  line-height: 1.4;
  color: #1d1d1f;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-break: break-word;
}

.message-right .message-text {
  background: #0071e3;
  color: #fff;
  border-radius: 16px 16px 4px 16px;
}

.message-right .message-content {
  align-items: flex-end;
}

.message-name {
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
}

.message-time {
  font-size: 12px;
  color: #86868b;
}

.message-text {
  background: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
  color: #1d1d1f;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-width: fit-content;
}

.message-right .message-text {
  background: #0071e3;
  color: #fff;
  margin-left: auto;
}

.input-area {
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  padding: 0 4px;
}

.tool-btn {
  padding: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  cursor: pointer;
  color: #86868b;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.tool-btn:hover {
  background: rgba(0, 113, 227, 0.1);
  color: #0071e3;
  transform: translateY(-1px);
}

.tool-btn:active {
  transform: scale(0.95);
}

.message-input {
  display: flex;
  gap: 12px;
  position: relative;
}

.message-input input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
  outline: none;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.message-input input:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.15);
  background: rgba(255, 255, 255, 0.95);
}

/* 通知徽章 */
.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff3b30;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 500;
}

/* 通知列表样式 */
.notifications-section {
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 0.8);
  overflow-y: auto;
}

.notifications-container {
  padding: 16px;
  max-width: 100%;
}

.notifications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.notifications-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.notifications-list {
}

.notification-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: white;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
}

.notification-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.notification-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.notification-content {
  margin-left: 12px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.notification-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.notification-title {
  font-size: 16px;
  font-weight: 500;
  color: #1d1d1f;
}

.notification-time {
  font-size: 14px;
  color: #86868b;
}

.notification-message {
  color: #666;
  font-size: 14px;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notification-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  width: 100%;
  justify-content: flex-end;
}

.accept-btn, .reject-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.accept-btn {
  background: #0071e3;
  color: white;
}

.accept-btn:hover {
  background: #0077ed;
}

.reject-btn {
  background: rgba(0, 0, 0, 0.05);
  color: #1d1d1f;
}

.reject-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.status-text {
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
}

.status-text.accepted {
  background: rgba(52, 199, 89, 0.1);
  color: #34c759;
}

.status-text.rejected {
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
}

.empty-notifications {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px 0;
  color: #86868b;
}

.empty-notifications svg {
  color: #86868b;
  opacity: 0.5;
}

.empty-notifications p {
  margin: 0;
  font-size: 15px;
}

.send-btn {
  padding: 0 20px;
  border: none;
  background: #0071e3;
  color: #fff;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.send-btn span {
  margin-right: 4px;
}

.send-btn svg {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.send-btn:hover {
  background: #0077ed;
  transform: translateY(-1px);
}

.send-btn:hover svg {
  transform: translateX(2px);
}

.send-btn:active {
  transform: scale(0.98);
}

/* 聊天列表样式优化 */
.chat-list-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  margin: 4px 8px;
}

.chat-list-item:hover {
  background: rgba(0, 0, 0, 0.03);
}

.chat-list-item.active {
  background: rgba(0, 113, 227, 0.08);
}

.chat-avatar {
  position: relative;
  margin-right: 12px;
}

.chat-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #fff;
}

.status-badge.online {
  background: #34c759;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-name {
  font-size: 15px;
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 4px;
}

.chat-preview {
  font-size: 13px;
  color: #86868b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.time {
  font-size: 12px;
  color: #86868b;
}

.unread {
  background: #0071e3;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

/* 列表容器样式优化 */
.list-content {
  height: calc(100vh - 180px);
  overflow-y: auto;
  padding: 8px 0;
}

/* 搜索框样式优化 */
.search-bar {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.search-bar input {
  width: 100%;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  font-size: 14px;
  outline: none;
}

.search-bar input:focus {
  background: rgba(0, 0, 0, 0.06);
  outline: none;
}

.search-bar input::placeholder {
  color: #86868b;
}

.add-section {
  height: 100%;
  background: #f5f5f7;
}

.search-container {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.search-input {
  width: 80%;
  padding: 12px 16px;
  box-sizing: border-box;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.search-input:focus {
  background: #fff;
  box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2);
  outline: none;
}

.search-btn {
  padding: 8px;
  border: none;
  background: rgba(0, 113, 227, 0.1);
  border-radius: 8px;
  cursor: pointer;
  color: #0071e3;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover {
  background: rgba(0, 113, 227, 0.2);
  transform: translateY(-1px);
  color: #ffffff;
}

.search-btn:active {
  transform: scale(0.95);
}

.search-btn:hover {
  background: #0077ed;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.2);
}

.user-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 16px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px -12px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.8);
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 28px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.1);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 4px;
  letter-spacing: -0.2px;
}

.user-bio {
  font-size: 14px;
  color: #86868b;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.add-btn {
  background: rgba(0, 113, 227, 0.1);
  color: #0071e3;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.add-btn:hover {
  background: rgba(0, 113, 227, 0.15);
  transform: translateY(-1px);
}

.add-btn:active {
  transform: scale(0.96);
}

.add-btn svg {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.add-btn:hover svg {
  transform: rotate(90deg);
}

.search-results {
  overflow-y: auto;
  margin-top: 16px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.search-results::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.no-results {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  color: #86868b;
}

.empty-state svg {
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 14px;
}

/* 消息容器样式优化 */
.message-container {
  background: #f5f5f7;
  padding: 10px 24px;
}

/* 输入区域样式优化 */
.input-area {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding: 16px 24px;
}

.message-input input {
  background: rgba(0, 0, 0, 0.02);
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.message-input input:focus {
  background: rgba(0, 0, 0, 0.04);
  box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.1);
}

.send-btn {
  background: #0071e3;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.send-btn:hover {
  background: #0077ed;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.2);
}

@media (max-width: 1200px) {
  .list-container {
    width: 260px;
  }
}

@media (max-width: 768px) {
  .chat-container {
    margin: 0;
    border-radius: 0;
  }
  
  .side-menu {
    width: 60px;
  }
  
  .menu-item {
    padding: 4px 8px;
    justify-content: center;
  }
  .menu-item span {
    display: none;
  }
  
  .list-container {
    width: 240px;
  }
}
</style>
