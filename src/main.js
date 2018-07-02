import Vue from 'vue';
import Toast from '@/components/Toast';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, '$toast', {
  get() {
    return Toast;
  },
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
