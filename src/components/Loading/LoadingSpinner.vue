<template>
  <div class="y-loading-spinner">
    <svg
      :style="sizeStyle"
      class="y-loading__svg"
      viewBox="25 25 50 50">
      <circle
        :stroke="color"
        :stroke-width="strokeWidth"
        class="y-loading__svg__circle"
        fill="none"
        cx="50"
        cy="50"
        r="20"/>
    </svg>
    <p
      v-if="msg"
      class="y-loading__msg">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    msg: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: '46px',
    },
    color: {
      type: String,
      default: '#fff',
    },
    strokeWidth: {
      type: [String, Number],
      default: 2,
    },
  },
  computed: {
    sizeStyle() {
      const val = typeof this.size === 'number'
        ? `${this.size}px`
        : this.size;
      return {
        width: val,
        height: val,
      };
    },
  },
};
</script>

<style lang="scss">
  @import '~@/styles/var.scss';
  .y-loading-spinner {
    display: inline-block;
    text-align: center;
  }

  .y-loading__svg {
    display: inline-block;
    animation: loading-rotate 2s linear infinite;
  }

  .y-loading__svg__circle {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-linecap: round;
  }

  .y-loading__msg {
    text-align: center;
  }

  @keyframes loading-rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
</style>
