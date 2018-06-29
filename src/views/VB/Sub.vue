<!--
  -- --------------------------------------------------------
  -- @file Sub.vue
  -- @author zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @date 2018-06-29 14:25:37
  -- @last_modified_by zhongxian_liang <zhongxian_liang@kingdee.com>
  -- @last_modified_date 2018-06-29 17:18:03
  -- @copyright (c) 2018 @yfe/vue-transition
  -- --------------------------------------------------------
 -->

<template>
  <div>
    <h1>this VB Sub</h1>
    <button @click="shuffle">Shuffle</button>
    <button @click="add">add</button>
    <button @click="remove">remove</button>
    <button @click="refresh">refresh</button>
    <p>{{ counter }}</p>
    <input
      v-model="keyWord"
      type="text">
    <trans-stagger
      tag="ul"
      class="">
      <li
        v-for="(item, idx) in filtered"
        :key="item"
        @click="increaseItem(idx)"
      >
        {{ item }}
      </li>
    </trans-stagger>
  </div>
</template>

<script>
import TransStagger from '@/components/TransGroupStagger.vue';

export default {
  name: 'Sub',
  components: {
    TransStagger,
  },
  data() {
    return {
      items: Array(10).fill(0).map((i, ii) => ii),
      nextNum: 10,
      keyWord: '',
      counter: 0,
    };
  },
  computed: {
    filtered() {
      if (this.keyWord === '') {
        return this.items;
      }
      return this.items
        .filter(item => item.toString().startsWith(this.keyWord));
    },
  },
  created() {
    setInterval(() => {
      this.counter += 1;
    }, 1000);
  },
  methods: {
    increaseItem(idx) {
      console.log('---', this.items[idx]);
      this.$set(this.items, idx, -this.items[idx]);
    },
    randomIndex() {
      return Math.floor(Math.random() * this.items.length);
    },
    shuffle() {
      this.items = this.items.sort(() => Math.random() - 0.5);
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum += 1);
    },
    remove() {
      this.items.splice(this.randomIndex(), 1);
    },
    refresh() {
      const res = this.items.slice();
      res.pop();
      res.pop();
      res.unshift(this.nextNum += 1);
      res.unshift(this.nextNum += 1);
      this.items = res;
    },
  },
};
</script>

<style scoped>
</style>
