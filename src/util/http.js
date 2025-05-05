import axios from 'axios'
import global from './global'
import useStore from "../store";
import router from "../router/index.js";
import {ElMessage} from "element-plus";

axios.defaults.baseURL = `http://${global.httpUrl}`
axios.defaults.headers.common['Authorization'] = ''

axios.interceptors.request.use(
    config => {
        const store = useStore()
        config.headers.Authorization = store.getToken;
        return config
    },
    error => {
        console.log("在request拦截器显示错误：", error.response)
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    response => {
        if(response.data.type){
            ElMessage({
                message: response.data.msg,
                type: response.data.type
            })
        }
        return Promise.resolve(response);
    },
    error => {
        const store = useStore()
        if (error.response.data.msg) {
            ElMessage({
                message: error.response.data.msg,
                type: error.response.data.type || 'error'
            })
        }
        switch (error.response.data.statusCode) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
                if(store.getToken != ''){
                    store.delToken()
                    store.delHeadImg()
                    ElMessage.warning('请重新登录')
                }else{
                    ElMessage.warning('请登录')
                }
                if(router.currentRoute.value.fullPath == '/user'){
                    return router.go(0)
                }else {
                    return router.replace({ //跳转到登录页面
                        path: '/user',
                        // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        query: {redirect: router.currentRoute.value.fullPath}
                    });
                }
            default:
                break;
        }
        return Promise.reject(error.response);
    }
);
export default axios