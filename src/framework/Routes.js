import childrenRoutes from '../allRoutes.js';

export default [
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['./Login/index.vue'], resolve)
    }, {
        path: '/home',
        name: 'home',
        component: resolve => require(['./Home/index.vue'], resolve),
        children: childrenRoutes
    }, {
        path: '/home',
        redirect: '/customer_list'
    }
]
;
