<template>
  <button
    class="y-button"
    v-on="$listeners"><slot/></button>
</template>

<script>
export default {
  name: 'Button',
};
</script>

