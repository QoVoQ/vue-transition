<!--
  -- --------------------------------------------------------
  -- @file TransFadeSimple.vue
  -- @author zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @date 2018-06-29 10:37:37
  -- @last_modified_by zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @last_modified_date 2018-06-29 16:28:23
  -- @copyright (c) 2018 @yfe/vue-transition
  -- --------------------------------------------------------
 -->

<script>
export default {
  name: 'TransFadeSimple',
  functional: true,
  render(createElement, context) {
    const transitionAttr = {
      props: {
        name: 'fade-simple',
        mode: 'out-in',
        ...context.data.attrs,
      },
    };

    return createElement('transition', transitionAttr, context.children);
  },
};
</script>

<style scoped>
</style>
