import Vue from 'vue';
import CToast from './Toast.vue';
import PopupManager from '../utils/popupManager';

/**
 * @param {Object|string} options - 如果options类型是string，即显示的信息
 * @param {number} options.duration - 一般不需要设置,会自动根据信息长度计算显示时间
 * @param {string} options.posBottom - 格式是100px或者百分比50%
 * @example this.$toast(msg)
 * @example this.$toast({msg, duration})
 */

const popupManager = new PopupManager(5);

const ToastCtr = Vue.extend(CToast);

const mountIns = (ins) => {
  ins.vm = ins.$mount();
  window.document.body.appendChild(ins.vm.$el);
  ins.vm.visible = true;
  ins.dom = ins.vm.$el;
  ins.dom.style.zIndex = 9999;

  /**
   * setTimeout make UI thread has chance to work
   * which guarantee former Toast Instance has been
   * appended to the document before the new one,
   * otherwise will fail to read 'bottom' value
   * in method popupManager.push
   */
  setTimeout(() => popupManager.push(ins), 10);
  return ins;
};

const Toast = function _ToastCtr(options) {
  let cfg = options;

  if (typeof cfg === 'string') {
    cfg = { msg: cfg };
  }

  if (!cfg.msg || typeof cfg.msg !== 'string') {
    throw new Error(`toast 参数有误--${JSON.stringify(cfg)}`);
  }

  const instance = new ToastCtr({
    propsData: cfg,
  });

  return mountIns(instance).vm;
};

export default Toast;
