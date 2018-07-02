<template>
  <transition
    name="dialog-pop-out"
    appear
    @after-leave="afterLeave">
    <div
      v-show="visible"
      :style="{ bottom: posBottom }"
      class="y-toast-wrap">
      <div class="y-toast-container">
        <div
          class="y-toast-body"
          v-html="msg"/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CToast',
  props: {
    msg: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    posBottom: {
      type: String,
      default: '51%',
    },
  },
  data() {
    return {
      visible: false,
      closed: false,
      timer: null,
      minDuration: 1500,
    };
  },
  computed: {
    cpDuration() {
      //  根据信息长度设置信息显示时间
      if (this.duration) {
        return this.duration;
      }
      return Math.min(
        Math.max(this.msg.length * 160, this.minDuration),
        10 * 1000,
      );
    },
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    },
    visible(newVal) {
      if (newVal) {
        this.timer = setTimeout(() => {
          this.close();
          clearTimeout(this.timer);
        }, this.cpDuration);
      }
    },
  },
  methods: {
    destroyElement() {
      // this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
    },
    afterLeave() {
      this.destroyElement();
    },
  },
};
</script>

<style>
  .y-toast-wrap {
    position: fixed;
    bottom: 30%;
    width: 100%;
    pointer-events: none;
    text-align: center;
    transition: bottom 0.2s;
  }

  .y-toast-container {
    position: relative;
    display: inline-block;
    padding: 14px 40px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1;
    color: #fff;
    background-color: #333;
    pointer-events: auto;
    box-shadow: 6px 5px 20px 0 rgba(0, 0, 0, 0.5);
  }
</style>
