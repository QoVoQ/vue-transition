<!--
  -- --------------------------------------------------------
  -- @file TransFadeHeight.vue
  -- @author zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @date 2018-06-29 11:14:47
  -- @last_modified_by zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @last_modified_date 2018-06-29 13:35:47
  -- @copyright (c) 2018 @yfe/vue-transition
  -- --------------------------------------------------------
 -->

<template>
  <transition
    name="fade-height"
    mode="out-in"
    @beforeLeave="beforeLeave"
    @enter="enter"
    @afterEnter="afterEnter">
    <slot/>
  </transition>
</template>


<script>
export default {
  name: 'TransFadeHeight',
  data() {
    return {
      preHeight: 0,
    };
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
