import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router"
import mitt from 'mitt'
import Danmaku from 'danmaku-vue'
//element-plus
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import common from "./util/common";
import http from "./util/http";
import slideIn from "./util/slideIn.js";


const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$utils = common
app.config.globalProperties.$http = http
app.config.globalProperties.$bus = mitt()

app.use(Danmaku)
app.use(pinia)
app.use(router)
// app.use(ElementPlus, {
//     locale: zhCn
// })
app.directive('slide-in', slideIn)

app.mount('#app')
