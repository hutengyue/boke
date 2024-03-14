import {createRouter,createWebHashHistory} from 'vue-router'
import storage from "../util/storage.js";
import useStore from "../store";
import cookie from "js-cookie";
import axios from "../util/http.js";
import common from '../util/common.js'


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
        path: '/log',
        component:()=>import("../pages/log.vue")
    },
    {
        path: '/visit',
        component:()=>import("../pages/visit.vue")

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
            },
            {
                path: '/admin/public',
                component:()=>import("../pages/backstage/public.vue")
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
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let flag = !cookie.get('visit')?true:false
    axios({
        url:'/visit',
        method:'POST',
        data:{
            flag:flag,
            city:store.getVisit.city,
            device:isMobile?'MB':'PC',
            browser:common.browserType()
        }
    }).then((res)=>{
        if(flag == true){
            store.setVisit({
                ip:res.data.ip,
                city:res.data.map.city
            })
            cookie.set('visit',res.data.map.city,{expires:0.25})
        }
    })
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