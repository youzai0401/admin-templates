import Vue from 'vue';
import App from './App';
import router from './router';
// promise兼容ie，处理axios菜蔬
import 'babel-polyfill';
// 初始化全局http回调
import {init} from './common/request.js';

// 主题
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';// 默认主题
import './main.less';
import vueWaves from './directive/waves';// 水波纹指令
import vueEventCalendar from './component/vue-event-calendar';
import btnpower from './directive/power/btn-power';
import limitword from './directive/limit-word/limit-word';
import {Message} from 'element-ui';
// part loading
import fixLoading from './directive/fix_loading';
Vue.use(fixLoading.directive);
// custom loading
import leLoading from './directive/loading/src/directive';
import fullLoading from './directive/fullloading/src/directive';
import minLoading from './directive/min-loading/src/directive';
// leLoading.install(Vue)
Vue.directive(btnpower.name, btnpower);
Vue.directive(limitword.name, limitword);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(vueWaves.vueWaves);


Vue.directive(leLoading.name, leLoading);
Vue.directive(fullLoading.name, fullLoading);
Vue.directive(minLoading.name, minLoading);
Vue.use(vueEventCalendar, {locale: 'zh'}); // locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja', 'ko', 'fr'
Vue.prototype.$bus = new Vue();
// 定义全局变量
Vue.prototype.$global = {maxL: 30};
/* eslint-disable no-new */
console.log('============================================');
console.log('执行了main代码是的吧');
const setLoading = () => {
    Vue.prototype.maskLoading = false;
    Vue.prototype.btnLoading = false;
    Vue.prototype.modalBtnLoading = false;
};
setLoading();

const vm = new Vue({
    el: '#app',
    // store,
    router,
    template: '<App/>',
    components: {App}
});
const initMessageFunction = () => {
    Vue.prototype.$message = ({type, message, showClose = true, duration = 3000}) => Message({type, message, customClass: `custom-${type}-message`, showClose, duration});
    const reSetMessage = types => {
        types.forEach(type => {
            Vue.prototype.$message[type] = message => Message({type, message, customClass: `custom-${type}-message`, showClose: true});
        });
    };
    reSetMessage(['error', 'success', 'warning', 'info']);
};
initMessageFunction(); // 复写全局的 message方法

// vm.$alert('错误信息', '系统提示信息', {
//     confirmButtonText: '确定',
//     customClass: 're-alert-error-message'
// });

init({
    success(res) {
        if (res.data.code === 108) {
            return vm.$router.replace('/login');
        }
        if ((res.data.code || res.data.code === 0) && res.data.code !== 200) {
            const message = res.data.message ? res.data.message : '系统错误';
            return vm.$message.error(message, 0);
        }
        // vm.$message.success('操作成功');
    },
    error(err) {
        if (err.response.status === 401) {
            return vm.$router.replace('/login');
        }
        console.log('err:', err);
        const errMsg = err.response.data.message || err;
        // vm.$message.error(`系统错误: ${errMsg}`, 0);
        vm.$alert(`系统错误: ${errMsg}`, '系统提示信息', {
            confirmButtonText: '确定',
            customClass: 're-alert-error-message'
        });
    }
});

