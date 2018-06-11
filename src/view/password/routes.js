const edit = resolve => require(['./edit/index.vue'], resolve);

export default [{
    path: '/edit_password',
    name: 'edit_password',
    component: edit
}];

