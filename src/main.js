import Vue from 'vue';
import Toast from '@/components/Toast';
import Confirm from '@/components/Confirmation';
import Loading from '@/components/Loading';
import VRipple from '@/directives/v-ripple';
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

Vue.directive('ripple', VRipple);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
