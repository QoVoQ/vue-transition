import Vue from 'vue';
import Toast from '@/components/Toast';
import Confirm from '@/components/Confirmation';
import Loading from '@/components/Loading';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, '$toast', {
  get() {
    return Toast;
  },
});

Object.defineProperty(Vue.prototype, '$confirm', {
  get() {
    return Confirm;
  },
});

Object.defineProperty(Vue.prototype, '$loading', {
  get() {
    return Loading;
  },
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
