<template>
  <div class="ctn">
    <h1>This is view B</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos e
      xplicabo omnis in quos nam exercitationem, corrupti mollitia possimus!
      odi alias accusantium explicabo provident aperiam earum similique quo aut
      temporibus est?
    </p>
    <div class="accordion__wrapper">
      <accordion :item-number="2">
        <div slot="accordion-item-title-1">关键词</div>
        <div
          slot="accordion-item-content-1"
          class="accordion-item-wrap keyword-focus-ctn">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            e
            xplicabo omnis in quos nam exercitationem, corrupti mollitia
            possimus!
            odi alias accusantium explicabo provident aperiam earum similique
            quo aut
            temporibus est?
          </p>
        </div>
        <div slot="accordion-item-title-2">
          行业分类
        </div>
        <div
          slot="accordion-item-content-2"
          class="accordion-item-wrap">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            e
            xplicabo omnis in quos nam exercitationem, corrupti mollitia
            possimus!
            odi alias accusantium explicabo provident aperiam earum similique
            quo aut
            temporibus est?
          </p>
        </div>
      </accordion>
    </div>
  </div>
</template>

<script>
import Accordion from '@/components/Accordion.vue';

export default {
  name: 'VB',
  components: {
    Accordion,
  },
  // created() {
  //   // this.$bus.$on('wer', () => {
  //   //   console.log(this);
  //   // });
  //   window.addEventListener('resize', this.logSelf);
  // },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.logSelf);
  // },
  methods: {
    logSelf() {
      console.log(this);
    },
  },
};
</script>

<style scoped>
  .ctn {
    max-width: 20%;
  }
</style>
