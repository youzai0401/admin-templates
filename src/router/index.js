/**
 * Created by caiyuan on 2017/8/1.
 */
import Vue from 'vue';
import Router from 'vue-router';
import routes from '../framework/Routes';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
// import {getRoutes, getIsLogin} from '../role/index';
import {cancelFetches} from '../common/request';

Vue.use(Router);

// let isAddRouter = false;
// let homePath = '';
const router = new Router({
    // mode: 'history',
    routes
    // scrollBehavior(to, from, savedPosition) {
    //    if (savedPosition) {
    //        return savedPosition;
    //    } else {
    //        return { x: 0, y: 0 };
    //    }
    // } 只能在history模式下才能用
});
console.log('routes:', routes);
console.log('=================================');
NProgress.configure({showSpinner: false});
router.beforeEach(async(to, from, next) => {
    cancelFetches();

    console.log('from::', from);
    console.log('to::', to);
    // const basicToPath = path => {
    //     if (to.path === path) {
    //         return next();
    //     }
    //     return next(path);
    // };
    // 后端说 点亮中国和后台是两个项目。点亮中国的接口没法判读用户有没有登录。
    // 所以只有我这边随便调个接口看有没有登录
    // if (to.path === '/home_map' || to.path === '/trend_analysis') {
    //     const s = await getIsLogin();
    //     if (s === false) {
    //         console.log('要去登录页了');
    //         return;
    //     }
    // }
    NProgress.start(); // 开启Progress
    if (!to.name && to.path !== '/') {
        return next('/404');
    }

    if (from.path === '/login' && to.path === '/') { // 如果是登录则清空路由表
        next();
        window.location.reload();
        return;
    }
    if (to.path === '/login') {
        return next();
    }
    if (to.path === '/') { // 如果已登录去home
        return next('/home');
    }
    return next();
    // if (!isAddRouter) { // 如果没有添加router
    //     const data = await getRoutes();
    //     console.log('===================================');
    //     console.log('isAddRouter不存在的时候添加的路由信息:', data);
    //     if (data === 'noUserId') { // 无用户信息
    //         return next('/login');
    //     }
    //     if (data === 'noUserInfo') {
    //         return next();
    //     }
    //     console.log('routesData::', data);
    //     // 正确则执行addRoutes
    //     homePath = data.url;
    //     router.addRoutes([data.routesArr], {override: true});
    //     isAddRouter = true;
    //     return next(to); // addRoutes 后执行next(to)
    // } else {
    //     if (to.path === '/') { // 如果已登录去home
    //         return next(homePath);
    //     }
    //     return next();
    // }
});

router.afterEach(() => {
    // $('#app ')
    NProgress.done(); // 结束Progress
    // 页面跳转时滚动到页面顶部
    // setTimeout(() => {
    //     const topElement = document.getElementById('lw-content');
    //     if (topElement) {
    //         topElement.scrollTop = 0;
    //     }
    // }, 100);
});

export default router;

