<!--
  -- --------------------------------------------------------
  -- @file TransGroupStagger.vue
  -- @author zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @date 2018-06-29 16:21:14
  -- @last_modified_by zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @last_modified_date 2018-06-29 17:11:48
  -- @copyright (c) 2018 @yfe/vue-transition
  -- --------------------------------------------------------
 -->

<script>
export default {
  name: 'TransGroupStagger',
  functional: true,
  render(createElement, context) {
    console.log(context);
    const transAttrs = {
      props: {
        name: 'list-stagger',
        ...context.data.attrs,
      },
      attrs: {
        class: context.data.staticClass === undefined
          ? 'list-stagger-ctn'
          : `list-stagger-ctn ${context.data.staticClass}`,
      },
    };
    context.children.forEach((vnode) => {
      const { staticClass } = vnode.data;
      staticClass === undefined
        ? vnode.data.staticClass = 'list-stagger-item'
        : vnode.data.staticClass += ' list-stagger-item';
    });

    return createElement('transition-group', transAttrs, context.children);
  },
};
</script>

<style scoped>
</style>
