<script>
export default {
  name: 'TransGroupStagger',
  functional: true,
  render(createElement, context) {
    const transAttrs = {
      props: {
        name: 'list-stagger',
        ...context.data.attrs,
      },
      on: {
        ...context.listeners,
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
