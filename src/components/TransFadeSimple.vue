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
      on: {
        ...context.listeners,
      },
    };

    return createElement('transition', transitionAttr, context.children);
  },
};
</script>

<style scoped>
</style>
