import {createRouter,createWebHashHistory} from 'vue-router'
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
        path: '/chat',
        name:'chat',
        component:()=>import("../pages/chat.vue"),
        meta: {
            requireAuth: true,
        }
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
        path: '/article',
        name:'article',
        component:()=>import("../pages/article.vue")
    },
    {
        path: '/tag',
        name: 'tag',
        component:()=>import("../pages/tag.vue")
    },
    {
        path: '/*',
        name:'404',
        component:()=>import("../pages/404.vue")
    },
    {
        path: '/admin',
        name:'admin',
        component:()=>import("../pages/admin.vue"),
        children:[
            {
                path: '',
                component:()=>import('../pages/backstage/page.vue')
            },
        ]

    }
]

const router = createRouter({
    history:createWebHashHistory(),
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