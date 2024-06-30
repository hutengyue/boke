<template>
  <div class="reg">
    <div :class="['container',{'right-panel-active':data.active == true}]">

      <div class="container__form container--signup">
        <div class="form" id="form1">
          <h2 class="form__title">注 册</h2>
          <input v-model="data.regName" type="text" maxlength="10" placeholder="用户名" class="input" />
          <input v-model="data.regPsd" type="text" placeholder="密码" class="input" />
          <input v-model="data.email" type="text" placeholder="邮箱" class="input" />
          <input v-model="data.regCode" type="text" placeholder="验证码" class="input" />
          <p v-show="data.code" @click="reqEmail()">获取验证码</p>

          <p v-show="!data.code">{{data.count}}</p>
          <button @click="register()" class="btn">注 册</button>
        </div>
      </div>

      <div class="container__form container--signin">
        <div class="form" id="form2">
          <h2 class="form__title">登 录</h2>
          <input v-model="data.logEmail" type="text" placeholder="邮箱" class="input" />
          <input v-model="data.logPsd" type="password" placeholder="密码" class="input" />
          <input v-model="data.logCode" type="text" placeholder="验证码" class="input" />
          <a class="link">忘记密码?</a>
          <div @click="init" v-html="data.captcha"></div>
          <button @click="login()" class="btn">登 录</button>
        </div>
      </div>

      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button @click="data.active = false" class="btn" id="signIn">登 录</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button @click="data.active = true" class="btn" id="signUp">注 册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, onBeforeUnmount, onMounted, reactive, watch} from "vue";
import { ElMessage } from 'element-plus'
import useStore from "../store/index.js";
import {useRouter} from "vue-router";
import route from "../router/route.js";
const {proxy} = getCurrentInstance()
const store = useStore()
const router = useRouter()
var data = reactive({
  logEmail:'',
  logPsd:'',
  logCode:'',
  captcha:'',
  text:'',
  //注册
  email:'',
  regName:'',
  regPsd:'',
  regCode:'',
  code:true,
  count:60,
  active:false,
  countTimer:null
})

function init(){
  proxy.$http.get('/auth/captcha').then(res=>{
    data.captcha = res.data.captcha
    data.text = res.data.text
  })
}

function start(){
  data.countTimer = setInterval(() => {
    data.count -= 1
  }, 1000)
}

function reqEmail(){
  var re = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
  if(re.test(data.email)){
    proxy.$http.post('/auth/registerEmail', {email:data.email}
    ).then(res => {
      if(res.data.type != "warning"){
        data.code = false;
        start()
      }
      return ElMessage({
        type: res.data.type,
        message: res.data.msg
      })
    })
  }else {
    ElMessage.warning('邮箱格式错误')
  }
}

function register(){
  var re = /^[a-z0-9]+$/i
  if(!re.test(data.regPsd)){
    return ElMessage.warning("密码只能是数字和字母")
  }
  if(data.regName == '' || data.regPsd == ''){
    return ElMessage.warning("用户名或密码为空")
  }else{
    proxy.$http.post('/auth/register',{
      regCode:data.regCode,
      user:{
        username:data.regName,
        password:data.regPsd,
        email:data.email,
      }
    }).then(res=>{
      if(res.data.type != "error"){
        data.logEmail = data.email
        data.email = '';data.regName='';data.regPsd='';data.regCode='';
        data.active = false
      }
      return ElMessage({
        message: res.data.msg,
        type: res.data.type
      });
    })
  }
}

function login(){
  if(data.logEmail == '' && data.logPsd == ''){
    return ElMessage.warning("邮箱与密码不能为空")
  }else if(data.logCode.toLowerCase() != data.text.toLowerCase()){
    return ElMessage.error("验证码错误")
  }else {
    proxy.$http.post('/auth/login',{
        email:data.logEmail,
        password:data.logPsd
    }).then(res => {
      if(Object.hasOwn(res.data, "token")){
        if(res.data.identity == "admin"){
          route.forEach((item)=>{
            router.addRoute('admin',item)
          })
        }
        store.setIdentity(res.data.identity)
        store.setHeadImg(res.data.headImg)
        store.setToken(res.data.token)
        router.push('/')
      }else {
        return ElMessage({
          message: res.data.msg,
          type: res.data.type
        });
      }
    })
  }
}

watch(()=>data.count,(newVal)=>{
  if(newVal == 0){
    data.code = true
    data.count = 60
    clearInterval(data.countTimer)
  }
})

onMounted(()=>{
  init()
})
onBeforeUnmount(()=>{
  clearInterval(data.countTimer)
})
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
.reg{
  position: relative;
  align-items: center;
  background: #e9e9e9 url("../assets/image/denglu.jpg") no-repeat fixed center;
  background-size: cover;
  display: grid;
  height: 100vh;
  width: 100%;
  place-items: center;
  animation: zhuye 1s ease 0s 1 normal none running;
}
.form__title {
  font-weight: 300;
  margin: 0 0 1.25rem;
  font-size: 40px;
}

.link {
  color: #333;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  text-decoration: none;
}

.container {
  border-radius: 0.7rem;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
  0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: 420px;
  max-width: 758px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container__form {
  height: 420px;
  position: absolute;
  background-color: white;
  top: 0;
  transition: all 0.6s ease-in-out;
  opacity: 1;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background: #008997 url("../assets/image/nv.jpg") no-repeat fixed center;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: #0367a6;
  background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
  border-radius: 20px;
  color: white;
  cursor: pointer;
  border: none;
  font-size: 20px;
  padding: 0.9rem 4rem;
  transition: transform 80ms ease-in;
}

.form>.btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #eee;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  height: 35px;
  width: 100%;
  color: black;
  font-size: 20px;
  border-radius: 10px;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>