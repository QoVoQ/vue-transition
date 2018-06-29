<!--
  -- --------------------------------------------------------
  -- @file TransFadeHeight.vue
  -- @author zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @date 2018-06-29 11:14:47
  -- @last_modified_by zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @last_modified_date 2018-06-29 17:18:58
  -- @copyright (c) 2018 @yfe/vue-transition
  -- --------------------------------------------------------
 -->

<template>
  <transition
    :name="transitionName"
    mode="out-in"
    @beforeLeave="beforeLeave"
    @enter="enter"
    @afterEnter="afterEnter">
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

      /* eslint-disable */
      // force render

      getComputedStyle(element).height;
      /* eslint-enable */

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
