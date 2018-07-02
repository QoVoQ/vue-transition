<script>
// Base on @see https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
export default {
  name: 'TransHeightExpand',
  functional: true,
  render(createElement, context) {
    // console.log(context);
    const transitionAttr = {
      props: {
        // @TODO add prop: duration
        name: 'height-expand',
      },
      on: {
        ...context.listeners,
        enter(ele) {
          // to get original size
          const { width } = getComputedStyle(ele);
          ele.style.position = 'absolute';
          ele.style.visibility = 'hidden';
          ele.style.height = 'auto';
          ele.style.width = width;

          const { height } = getComputedStyle(ele);

          ele.style.position = '';
          ele.style.visibility = '';
          ele.style.width = '';
          ele.style.height = 0;

          // force dom re-render
          getComputedStyle(ele).height;

          // Trigger the animation.
          // We use `setTimeout` because we need
          // to make sure the browser has finished
          // painting after setting the `height`
          // to `0` in the line above.
          requestAnimationFrame(() => {
            ele.style.height = height;
          });

          context.listeners.enter && context.listeners.enter(ele);
        },
        afterEnter(ele) {
          console.log(123);
          ele.style.height = 'auto';
          context.listeners['after-enter'] && context.listeners['after-enter'](ele);
          context.listeners.afterEnter && context.listeners.afterEnter(ele);
        },
        leave(ele) {
          const { height } = getComputedStyle(ele);
          ele.style.height = height;

          // force dom re-render
          getComputedStyle(ele).height;

          requestAnimationFrame(() => {
            ele.style.height = '0';
          });

          context.listeners.leave && context.listeners.leave(ele);
        },
      },
    };
    return createElement('transition', transitionAttr, context.children);
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/styles/utils.scss';
  * {
    @include forceGPU(height);
  }
</style>
