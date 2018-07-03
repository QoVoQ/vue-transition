<template>
  <transition
    name="dialog-pop-out"
    @after-leave="afterLeave">
    <div
      v-show="visible"
      :style="wrapperStyle"
      class="y-loading__wrapper">
      <spinner v-bind="$props"/>
    </div>
  </transition>
</template>

<script>
import Spinner from './LoadingSpinner.vue';

export default {
  name: 'Loading',
  components: {
    Spinner,
  },
  inheritAttrs: false,
  props: {
    bgColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)',
    },
    ...Spinner.props,
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    wrapperStyle() {
      return {
        'background-color': this.bgColor,
      };
    },
  },
  created() {
    console.log(Spinner);
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
  },
};
</script>

<style lang="scss">
  @import '~@/styles/utils.scss';

  .y-loading__wrapper {
    @extend %mask-wrapper;
  }
</style>
