const route = [
    {
        path:'users',
        component:()=>import("../pages/backstage/users.vue")
    },
    {
        path:'comments',
        component:()=>import("../pages/backstage/comments.vue")
    },
    {
        path: 'public',
        component:()=>import("../pages/backstage/public.vue")
    },
    {
        path: 'logs',
        component:()=>import("../pages/backstage/logs.vue")
    },
    {
        path: 'articles',
        component:()=>import("../pages/backstage/articles.vue")
    },
    {
        path: 'messages',
        component:()=>import("../pages/backstage/messages.vue")
    },
    {
        path: 'tags',
        component:()=>import("../pages/backstage/tags.vue")
    },
    {
        path: 'categories',
        component:()=>import("../pages/backstage/categories.vue")
    }
]
export default route