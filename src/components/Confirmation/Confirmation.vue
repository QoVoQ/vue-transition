<template>
  <transition
    name="dialog-pop-out"
    @after-leave="afterLeave">
    <div
      v-show="visible"
      class="y-confirmation__wrapper"
      @click.self="handleWrapperClick">
      <div
        class="y-confirmation">
        <div class="y-confirmation__header">
          <slot name="title">
            <p class="y-confirmation__title">{{ title }}</p>
          </slot>
          <btn
            v-if="showClose"
            type="button"
            class="y-confirmation__header-btn"
            @click="handleClose">
            <i class="y-confirmation__close">+</i>
          </btn>
        </div>
        <div
          class="y-confirmation__body">
          <slot><p class="y-confirmation__msg">{{ msg }}</p></slot>
        </div>
        <div
          class="y-confirmation__footer">
          <btn
            class="y-confirmation__footer-btn
            y-confirmation__footer-btn--confirm"
            @click="onConfirmPrivate">
            {{ confirmBtnText }}
          </btn>
          <btn
            v-if="!isSingleBtn"
            class="y-confirmation__footer-btn
            y-confirmation__footer-btn--cancel"
            @click="onCancelPrivate">
            {{ cancelBtnText }}
          </btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Btn from '@/components/Button.vue';

export default {
  name: 'Confirmation',
  components: {
    Btn,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    msg: {
      type: String,
      default: '',
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    confirmBtnText: {
      type: String,
      default: '确认',
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
    isSingleBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    destroyElement() {
      // this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.visible = false;
    },
    afterLeave() {
      this.destroyElement();
    },
    onConfirmPrivate() {
      this.onConfirm();
      this.close();
      this.$emit('confirm');
    },
    onCancelPrivate() {
      this.onCancel();
      this.close();
      this.$emit('cancel');
    },
    handleClose() {
      this.onCancelPrivate();
    },
    handleWrapperClick() {
      this.onCancelPrivate();
    },
  },
};
</script>

<style lang="scss">
  @import '~@/styles/utils.scss';

  .y-confirmation__wrapper {
    @extend %mask-wrapper;
    @extend %flex-center;
  }

  .y-confirmation {
    @extend %pop-out-ctn;
    width: 30%;
    min-width: 500px;
    padding: 16px;
    background: #fff;
  }

  .y-confirmation__header {
    @extend %flex-center;
    justify-content: space-between;
  }

  .y-confirmation__title {
    text-align: center;
  }

  .y-confirmation__header-btn {
    $y-offset: -16px;
    position: relative;
    margin-right: $y-offset;
    left: $y-offset;
  }

  .y-confirmation__msg {
    text-align: center;
  }

  .y-confirmation__footer {
    @extend %flex-center;
  }

  .y-confirmation__footer-btn + .y-confirmation__footer-btn {
    margin-left: 3em;
  }
</style>
