import Vue from 'vue';
import Confirmation from './Confirmation.vue';

const ConfirmCtr = Vue.extend(Confirmation);
/**
 * @param options
 * {
 *   msg {String}: 显示的信息
 *   title {String}: title
 *   onConfirm: {Function}: 点击 确定 的回调函数
 *   confirmBtnText {String}: 左边按钮描述
 *   onCancel {Function}: 点击 取消 的回调函数
 *   cancelBtnText {String}: 右边按钮描述
 * }
 *
 * 用法： this.$confirm已注册为全局方法， 所以可以在组件中直接调用 this.$confirm({msg, onEnsure...})
 */

const Confirm = function _Confirm(options) {
  options = options || {};

  return new Promise((resolve, reject) => {
    const instance = new ConfirmCtr({
      propsData: {
        ...options,
        onConfirm: resolve,
        onCancel: reject,
      },
    });

    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instance.dom.style.zIndex = 888;
  });
};

export default Confirm;
