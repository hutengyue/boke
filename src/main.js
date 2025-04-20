import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import piniaPersist from 'pinia-plugin-persist'
import mitt from 'mitt'
import Danmaku from 'danmaku-vue'
//element-plus
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import router from "./router/index.js";
import { addAdminRoutes } from "./router/admin.js";


import common from "./util/common";
import http from "./util/http";
import directive from "./util/directive.js"
import echarts from './util/echarts.js'

addAdminRoutes();

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)

app.config.globalProperties.$utils = common
app.config.globalProperties.$http = http
app.config.globalProperties.$bus = mitt()
app.config.globalProperties.$echarts = echarts

app.use(Danmaku)
app.use(pinia)
app.use(router)
// app.use(ElementPlus, {
//     locale: zhCn
// })
app.use(directive)

app.mount('#app')
