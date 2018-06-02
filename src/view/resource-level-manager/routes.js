const resourceLevelAdd = resolve => require(['./resource-level-add/index.vue'], resolve);
const resourceLevelList = resolve => require(['./resource-level-list/index.vue'], resolve);
const resourceLevelCheck = resolve => require(['./resource-level-check/index.vue'], resolve);

export default [{
    path: '/resource_level_list',
    name: 'resource_level_list',
    component: resourceLevelList
}, {
    path: '/resource_level_add',
    name: 'resource_level_add',
    component: resourceLevelAdd,
    meta: {
        menuPath: '/resource_level_list'
    }
}, {
    path: '/resource_level_check',
    name: 'resource_level_check',
    component: resourceLevelCheck,
    meta: {
        menuPath: '/resource_level_list'
    }
}];


