import {createRouter,createWebHashHistory} from 'vue-router'
import storage from "../util/storage.js";
import useStore from "../store";


const routes = [
    {
        path:'/',
        component:()=>import("../pages/home.vue")
    },
    {
        path: '/chat',
        component:()=>import("../pages/chat.vue"),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/user',
        component:()=>import("../pages/user.vue")
    },
    {
        path: '/message',
        component:()=>import("../pages/message.vue")
    },
    {
        path: '/count',
        component:()=>import("../pages/count.vue")
    },
    {
        path: '/about',
        component:()=>import("../pages/about.vue")
    },
    {
        path: '/article',
        component:()=>import("../pages/article.vue")
    },
    {
        path: '/admin',
        component:()=>import("../pages/admin.vue"),
        children:[
            {
                path:'users',
                component:()=>import("../pages/backstage/users.vue")
            },
            {
                path:'comments',
                component:()=>import("../pages/backstage/comments.vue")
            }
        ]
    },
    {
        path: '/admin/articlePublic',
        component:()=>import("../pages/articlePublic.vue")
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