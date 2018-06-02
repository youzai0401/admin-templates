const Add = resolve => require(['./add/index.vue'], resolve);
const List = resolve => require(['./list/index.vue'], resolve);

export default [
    {
        path: '/customer_list',
        name: 'customer_list',
        component: List
    }, {
        path: '/customer_add',
        name: 'customer_add',
        component: Add,
        meta: {
            menuPath: '/customer_list'
        }
    }];


