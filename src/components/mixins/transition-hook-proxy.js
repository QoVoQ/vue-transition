export default {
  methods: {
    beforeEnter(element) {
      this.beforeEnterPrivate && this.beforeEnterPrivate(element);
      this.$emit('before-enter', element);
      this.$emit('beforeEnter', element);
    },
    enter(element) {
      this.enterPrivate && this.enterPrivate(element);

      this.$emit('enter', element);
    },
    afterEnter(element) {
      this.afterEnterPrivate && this.afterEnterPrivate(element);

      this.$emit('after-enter', element);
    },
    enterCancelled(element) {
      this.enterCancelledPrivate && this.enterCancelledPrivate(element);
      this.$emit('enter-cancelled', element);
      this.$emit('enterCancelled', element);
    },
    beforeLeave(element) {
      this.beforeLeavePrivate && this.beforeLeavePrivate(element);
      this.$emit('before-leave', element);
      this.$emit('beforeLeave', element);
    },
    leave(element) {
      this.leavePrivate && this.leavePrivate(element);
      this.$emit('leave', element);
    },
    afterLeave(element) {
      this.afterLeavePrivate && this.afterLeavePrivate(element);
      this.$emit('after-leave', element);
      this.$emit('afterLeave', element);
    },
    leaveCancelled(element) {
      this.leaveCancelledPrivate && this.leaveCancelledPrivate(element);
      this.$emit('leave-cancelled', element);
      this.$emit('leaveCancelled', element);
    },
  },
};
