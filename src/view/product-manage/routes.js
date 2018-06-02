const Add = resolve => require(['./add/index.vue'], resolve);
const List = resolve => require(['./list/index.vue'], resolve);

export default [
    {
        path: '/product_list',
        name: 'product_list',
        component: List
    }, {
        path: '/product_add',
        name: 'product_add',
        component: Add,
        meta: {
            menuPath: '/product_list'
        }
    }];


