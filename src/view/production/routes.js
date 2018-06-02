const resourceLevelAdd = resolve => require(['./production-add/index.vue'], resolve);
const resourceLevelList = resolve => require(['./production-list/index.vue'], resolve);
const resourceLevelCheck = resolve => require(['./production-detail/index.vue'], resolve);

export default [{
    path: '/production_list',
    name: 'production_list',
    component: resourceLevelList
}, {
    path: '/production_add',
    name: 'production_add',
    component: resourceLevelAdd,
    meta: {
        menuPath: '/production_list'
    }
}, {
    path: '/production_detail',
    name: 'production_detail',
    component: resourceLevelCheck,
    meta: {
        menuPath: '/production_list'
    }
}];


