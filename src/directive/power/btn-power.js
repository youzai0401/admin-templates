import common from '../../common/common';

export default {
    name: 'btnpower',
    params: [],
    bind(el, val) {
        const user = common.store.getUser();
        if (user && user.loginName === 'admin') {
            console.log('admin');
            return;
        }
        if (val && val.value && val.value.authority) {
            if (val.value.authority.indexOf('allAuthority') !== -1) {
                return;
            }
            console.log(val.value);
            const name = el.getAttribute('data-name');
            const info = val.value;
            const t = info.authority;
            console.log('当前权限：：', t);
            if (t.indexOf(name) === -1) {
                // el.remove();
                el.style.display = 'none';
                el.className = '';
            }
        }
    }
};