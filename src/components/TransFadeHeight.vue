<template>
  <transition
    :name="transitionName"
    mode="out-in"
    v-on="$listeners"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave">
    <slot/>
  </transition>
</template>


<script>

const DEFAULT_TRANSITION = 'fade-height';

export default {
  name: 'TransFadeHeight',
  props: {
    slidable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      preHeight: 0,
      transitionName: DEFAULT_TRANSITION,
    };
  },
  created() {
    if (!this.slidable) {
      return;
    }
    this.$router.beforeEach((to, from, next) => {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      const transitionName =
        toDepth < fromDepth
          ? 'page-slide-right'
          : toDepth !== fromDepth
            ? 'page-slide-left'
            : DEFAULT_TRANSITION;

      this.transitionName = transitionName;

      next();
    });
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      // force render

      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
  },
};
</script>

<style scoped>
</style>
