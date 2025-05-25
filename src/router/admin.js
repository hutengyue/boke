import router from "../router/index.js";



// 权限路由配置
const permissionRoutes = {
    admin: [
        {
            path: 'users',  // 子路由保持相对路径
            name: "users",
            component: () => import("../pages/backstage/users.vue"),
            meta: {
                icon: 'User',
                title: '用户管理'
            }
        },
        {
            path: 'comments',
            name: "comments",
            component: () => import("../pages/backstage/comments.vue"),
            meta: {
                icon: 'ChatLineRound',
                title: '评论管理'
            }
        },
        {
            path: 'messages',
            name: "messages",
            component: () => import("../pages/backstage/messages.vue"),
            meta: {
                icon: 'Message',
                title: '留言管理'
            }
        },
        {
            path: 'logs',
            name: "logs",
            component: () => import("../pages/backstage/logs.vue"),
            meta: {
                icon: 'List',
                title: '日志管理'
            }
        },
        {
            path: 'tags',
            name: "tags",
            component: () => import("../pages/backstage/tags.vue"),
            meta: {
                icon: 'Collection',
                title: '标签管理'
            }
        },
        {
            path: 'categories',
            name: "categories",
            component: () => import("../pages/backstage/categories.vue"),
            meta: {
                icon: 'Files',
                title: '分类管理'
            }
        },
        {
            path: 'articles',
            name: "articles",
            component: () => import("../pages/backstage/articles.vue"),
            meta: {
                icon: 'Document',
                title: '文章列表'
            }
        },
        {
            path: 'public',
            name: "public",
            component: () => import("../pages/backstage/public.vue"),
            meta: {
                icon: 'EditPen',
                title: '公开文章'
            }
        }
    ]
}

// 基础路由配置
const adminRoutes = {
    path: '/admin',
    name: 'admin',
    component: () => import("../pages/admin.vue"),
    meta: {
        icon: 'Monitor',
        title: '后台管理'
    },
    children: [
        {
            path: 'visitor',  // 改为具体的子路径
            name: "visitor",
            component: () => import('../pages/backstage/visitor.vue'),
            meta: {
                icon: 'Histogram',
                title: '访客记录'
            }
        },
        {
            path: 'analysis',  // 改为具体的子路径
            name: "analysis",
            component: () => import('../pages/backstage/analysis.vue'),
            meta: {
                icon: 'Histogram',
                title: '分析页'
            }
        },
    ]
}

// 根据角色获取路由配置
function getRoutesByRole(role) {
    let _route = []
    if (role === 'admin') {
        _route.push(...permissionRoutes.admin)
    }
    return _route
}

export function addAdminRoutes() {
    const identity = localStorage.getItem('identity')?.replace(/"/g, '')
    // 添加基础路由
    if (identity === 'user' || identity === 'admin') {
        // 先移除已存在的admin路由
        removeAdminRoutes()
        // 获取权限路由
        const routes = getRoutesByRole(identity)
        // 创建新的路由配置，避免修改原对象
        const newAdminRoute = {
            ...adminRoutes,
            children: [...adminRoutes.children, ...routes]
        }
        // 添加完整的路由配置
        router.addRoute(newAdminRoute)
    }
}

export function removeAdminRoutes() {
    router.removeRoute('admin')
}