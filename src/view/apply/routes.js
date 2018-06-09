const Add = resolve => require(['./add/index.vue'], resolve);
const List = resolve => require(['./list/index.vue'], resolve);

export default [
    {
        path: '/apply_list',
        name: 'apply_list',
        component: List
    }, {
        path: '/apply_add',
        name: 'apply_add',
        component: Add,
        meta: {
            menuPath: '/apply_list'
        }
    }];


