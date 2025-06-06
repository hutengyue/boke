import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'
import storage from "../util/storage.js";
import useStore from "../store";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: true })
const routes = [
    {
        path:'/',
        name:'home',
        component:()=>import("../pages/home.vue")
    },
    {
        name:'category',
        path: '/category',
        component:()=>import("../pages/category.vue")
    },
    {
        name:'user',
        path: '/user',
        component:()=>import("../pages/user.vue")
    },
    {
        path: '/message',
        name:'message',
        component:()=>import("../pages/message.vue")
    },
    {
        path: '/log',
        component:()=>import("../pages/log.vue")
    },
    {
        path: '/visit',
        name:'log',
        component:()=>import("../pages/visit.vue")

    },
    {
        path: '/about',
        name:'about',
        component:()=>import("../pages/about.vue")
    },
    {
        path: '/article/:articleId',
        name:'article',
        component:()=>import("../pages/article.vue")
    },
    {
        path: '/tag',
        name: 'tag',
        component:()=>import("../pages/tag.vue")
    },
    {
        path: '/openIM',
        name: 'openIM',
        component:()=>import("../pages/openIM.vue")
    },
    {
        path: '/*',
        name:'404',
        component:()=>import("../pages/404.vue")
    }
    
]

const isProd = import.meta.env.MODE === 'production'
const router = createRouter({
    history: isProd ? createWebHistory() : createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const store = useStore()

    if (storage.get("token")) {
        store.setToken(storage.get("token"))
    }
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.token) {
            next(); //有token,进行request请求，后台还会验证token
        } else {

            next({
                path: "/user"
            });
            alert("你尚未登陆")
        }
    } else {
        document.body.scrollTop = 0
        // firefox
        document.documentElement.scrollTop = 0
        // safari
        NProgress.start()
        next(); //如果无需token
    }
});
router.afterEach(()=>{
    NProgress.done()
})

export default router
