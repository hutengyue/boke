<script setup>
import {getCurrentInstance, onBeforeUnmount, onMounted, reactive, watch,ref} from "vue";
import { ElMessage } from 'element-plus'
import useStore from "../store/index.js";
import {useRouter} from "vue-router";
import { addAdminRoutes } from "../router/admin.js";

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
        store.setIdentity(res.data.identity)
        store.setHeadImg(res.data.headImg)
        store.setToken(res.data.token)
        store.setUsername(res.data.username)
        addAdminRoutes()
        const redirect = router.currentRoute.value.query.redirect || '/'
        router.push(redirect)
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

const isMobile = ref(false)

onMounted(() => {
  // 原有代码保持不变
  init()
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  // 原有代码保持不变
  window.removeEventListener('resize', checkMobile)
})

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}
</script>

<template>
  <div class="reg">
    <div class="mobile-switch" v-show="isMobile">
      <button :class="{ active: !data.active }" @click="data.active = false">登录</button>
      <button :class="{ active: data.active }" @click="data.active = true">注册</button>
    </div>
    <div :class="['container',{'right-panel-active':data.active == true}]">
      <div class="container__form container--signup">
        <div class="form" id="form1">
          <h2 class="form__title">注 册</h2>
          <input v-model="data.regName" type="text" maxlength="10" placeholder="用户名" class="input" />
          <input v-model="data.email" type="text" placeholder="邮箱" class="input" />
          <input v-model="data.regPsd" type="text" placeholder="密码" class="input" />
          <input v-model="data.regCode" type="text" placeholder="验证码" class="input" @keyup.enter="register" />
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
          <input v-model="data.logCode" type="text" placeholder="验证码" class="input" @keyup.enter="login" />
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

.form__title {
  font-weight: 600;
  margin: 0 0 1.25rem;
  font-size: 32px;
  color: #1d1d1f;
  letter-spacing: -0.02em;
}

.form > .input {
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 14px;
  margin-bottom: 8px;
  width: 100%;
  height: 44px;
  font-size: 15px;
  border-radius: 12px;
  transition: all 0.3s;
  color: #1d1d1f;
}

.form > .input:focus {
  outline: none;
  border-color: #0071e3;
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
}

.form > p {
  color: #0071e3;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  margin: 0;
}

.form > p:hover {
  background: rgba(0, 113, 227, 0.1);
}

.form > p[v-show="!data.code"] {
  color: #86868b;
  cursor: default;
}

.form > .link {
  color: #0071e3;
  font-size: 14px;
  margin: 8px 0;
  text-decoration: none;
  transition: color 0.2s;
}

.form > .link:hover {
  color: #0077ED;
  text-decoration: underline;
}

.form > .btn {
  margin-top: 1.5rem;
  background: linear-gradient(135deg, #42a1ec, #0071e3);
  font-size: 16px;
  padding: 0.8rem 3rem;
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


/* mobile */
@media (max-width: 768px) {
  .reg {
    background: #f5f5f7;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    left: 0;
  }

  .container {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
    overflow: hidden;
  }

  .container__form {
    height: 100vh;
    width: 100vw !important;
    padding: 0;
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .container--signin {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .container.right-panel-active .container--signin {
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
  }

  .container.right-panel-active .container--signup {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .form {
    padding: 24px;
    height: 100vh;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .form__title {
    font-size: 32px;
    margin-bottom: 40px;
    background: linear-gradient(135deg, #1d1d1f, #434343);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: none;
  }

  .mobile-switch {
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    padding: 4px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    width: 85%;
    max-width: 300px;
    z-index: 1000;
  }

  .mobile-switch button {
    flex: 1;
    padding: 12px 24px;
    border: none;
    background: transparent;
    color: #1d1d1f;
    font-size: 15px;
    font-weight: 500;
    border-radius: 12px;
    transition: all 0.3s;
  }

  .mobile-switch button.active {
    background: #0071e3;
    color: white;
  }

  .container__overlay {
    display: none;
  }

  /* 输入框样式优化 */
  .form > .input {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.1);
    height: 50px;
    margin-bottom: 16px;
    font-size: 16px;
    backdrop-filter: blur(10px);
  }

  .form > .btn {
    background: #0071e3;
    margin-top: 32px;
    height: 50px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }
}

@media (max-width: 480px) {
  .form {
    padding: 20px;
  }

  .form__title {
    font-size: 28px;
    margin-bottom: 32px;
  }

  .mobile-switch {
    width: 90%;
  }
}
</style>