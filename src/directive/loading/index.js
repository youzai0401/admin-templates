import a from './src/directive';
import service from './src/index';
const directive = a;
console.log(directive)
export default {
  install(Vue) {
    Vue.use(directive);
    Vue.prototype.$loading = service;
  },
  directive,
  service
};
