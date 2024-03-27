import {createRouter,createWebHashHistory} from 'vue-router'
import storage from "../util/storage.js";
import useStore from "../store";
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
        path: '/admin',
        name:'admin',
        component:()=>import("../pages/admin.vue"),
        // meta: {
        //     requireAuth: true,
        // },
        children:[
            {
                path:'users',
                component:()=>import("../pages/backstage/users.vue")
            },
            {
                path:'comments',
                component:()=>import("../pages/backstage/comments.vue")
            },
            {
                path: '/admin/public',
                component:()=>import("../pages/backstage/public.vue")
            },
            {
                path: '/admin/logs',
                component:()=>import("../pages/backstage/logs.vue")
            }
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
        next(); //如果无需token
    }
});

export default router