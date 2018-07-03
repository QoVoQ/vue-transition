import Vue from 'vue';
import LoadingComp from './Loading.vue';

const LoadingCtr = Vue.extend(LoadingComp);

let instance = null;

/**
 * @TODO Vue.install
 *  i) setDefault options
 *  ii) local loading (v-directive) @see http://element.eleme.io/#/zh-CN/component/loading
 */

const Loading = function _Loading(options = {}) {
  if (options === false) {
    if (instance === null) {
      return;
    }

    instance.vm.visible = false;
    instance = null;
    return;
  }

  typeof options === 'string' && (options = { msg: options });
  instance = new LoadingCtr({
    propsData: options,
  });

  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = 888;
};

export default Loading;
