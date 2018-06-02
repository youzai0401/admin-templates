import common from '../../common/common';

export default {
    name: 'handlepower',
    params: [],
    bind(el, val) {
        const user = common.store.getUser();
        if (user && user.loginName === 'admin') {
            console.log('admin');
            return;
        }
        console.log('sssssssssss::', el)
        if (val && val.value && val.value.authority) {
            console.log(val.value);
            const btns = el.getAttribute('data-btns');
            const btnsArr = btns.split(',');
            const info = val.value;
            const t = info.authority;

            let index = 0;
            for (let i = 0, len = btnsArr.length; i < len; i++) {
                if (t.indexOf(btnsArr[0]) === -1) {
                    index++;
                }
            }

            if (btnsArr.length === index) {
                // el.style.display = 'none';
            }
        }
    }
};