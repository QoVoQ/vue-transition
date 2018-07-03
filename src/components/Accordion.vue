<template>
  <div
    :id="accordionID"
    class="accordion-ctn">
    <ul class="accordion-list">
      <li
        v-for="idx in itemNumber"
        :key="idx"
        class="accordion-item-ctn">
        <div class="accordion-item">
          <div
            class="accordion-item-title"
            @click="displayItem(idx - 1)">
            <div class="title">
              <slot :name="`accordion-item-title-${idx}`"/>
            </div>
            <i class="icon icon-down-o"/>
          </div>
          <div class="accordion-item-content">
            <slot :name="`accordion-item-content-${idx}`"/>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fakeUID } from 'qovoq-utils';
import anime from 'animejs';

export default {
  name: 'CAccordion',
  props: {
    itemNumber: {
      type: Number,
      default: 2,
    },
    duration: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      accordionID: fakeUID(),
      openState: [],
      accordionItemCtns: null,
      firstSnapshot: {
        animating: { DOM: null, bounding: null },
        statics: [],
      },
      lastSnapshot: {
        animating: { DOM: null, bounding: null },
        statics: [],
      },
      animatingLock: false,
    };
  },
  created() {
    this.openState = new Array(this.itemNumber).fill(true);
  },
  mounted() {
    this.getItemDOMs();
  },
  methods: {
    displayItem(animatingIdx) {
      if (this.animatingLock) { return; }
      this.animatingLock = true;
      // first
      this.firstSnapshot = this.getSnapshot(animatingIdx);
      const accordionList = document.querySelector(`#${this.accordionID}`);
      accordionList.style.height = `${accordionList.offsetHeight}px`;

      // last
      const animatingItemCtn = this.firstSnapshot.animating.DOM;
      const animatingItem = animatingItemCtn.querySelector('.accordion-item');
      const icon = animatingItem.querySelector('.icon-down-o');
      if (!animatingItemCtn) { throw new Error('failed to find animating accordion content'); }

      this.openState[animatingIdx]
        ? animatingItemCtn.classList.add('collapsed') // to collapse
        : animatingItemCtn.classList.remove('collapsed'); // to expand

      this.lastSnapshot = this.getSnapshot(animatingIdx);

      this.openState[animatingIdx] && animatingItemCtn.classList.remove('collapsed');

      this.openState[animatingIdx]
        ? icon.classList.add('inverted') // to collapse
        : icon.classList.remove('inverted'); // to expand

      // invert
      const dh =
                this.lastSnapshot.animating.bounding.height
                - this.firstSnapshot.animating.bounding.height;
        // play
      let startDh = dh;
      let endDh = 0;
      if (this.openState[animatingIdx]) { // collapsing
        startDh = 0;
        endDh = dh;
      }

      anime(
        animatingItemCtn,
        { translateY: [endDh, -startDh] },
        {
          duration: this.duration,
          complete: (ele) => {
            ele[0].style.cssText = '';
            this.openState[animatingIdx] && animatingItemCtn.classList.add('collapsed');
            this.openState[animatingIdx] = !this.openState[animatingIdx];
            accordionList.style.height = '';
            this.animatingLock = false;
          },
        },
      );

      anime({
        targets: animatingItem,
        translateY: [-endDh, startDh],
        duration: this.duration,
        complete: (ele) => {
          ele[0].style.cssText = '';
        },
      });

      this.firstSnapshot.statics.forEach((item, idx) => {
        const dy =
          item.bounding.top - this.lastSnapshot.statics[idx].bounding.top;

        let startDy = dy;
        let endDy = 0;
        if (this.openState[animatingIdx]) { // collapsing
          startDy = 0;
          endDy = dy;
        }

        if (startDy === endDy) { return; }

        anime({
          target: item.DOM,
          translateY: [-endDy, startDy],
          duration: this.duration,
          complete: (ele) => {
            ele[0].style.cssText = '';
          },
        });
      });
    },
    getSnapshot(animatingIdx) {
      const all = [...this.accordionItemCtns].map(item => ({
        DOM: item,
        bounding: item.getBoundingClientRect(),
      }));
      const animating = all.splice(animatingIdx, 1)[0];

      return {
        animating,
        statics: all,
      };
    },
    getItemDOMs() {
      const ctn = document.querySelector(`#${this.accordionID}`);
      if (!ctn) { throw new Error('failed to find accordion container'); }

      this.accordionItemCtns = ctn.querySelectorAll('li.accordion-item-ctn');

      if (this.itemNumber !== this.accordionItemCtns.length) {
        throw new Error('preserved class name [accordion-item-ctn] was used!');
      }
    },
  },
};
</script>

<style scoped>
  .accordion-list {
  }

  .accordion-item-ctn {
    height: auto;
    overflow: hidden;
  }

  .accordion-item-ctn + .accordion-item-ctn {
    margin-top: 0.3rem;
  }

  .accordion-item-ctn.collapsed {
    /* @TODO height is a variable */
    height: 2.25rem;
  }

  .accordion-item {
  }

  .accordion-item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.25rem;
    background-color: #fff;
    border-bottom: 1px solid #b5b5b6;
  }

  .accordion-item-title .title {
    margin-left: 1.6rem;
    font-weight: bold;
    font-size: 0.75rem;
    color: #222;
  }

  .accordion-item-title .icon-down-o {
    margin-right: 1.75rem;
    color: #9a9a9a;
    transition: transform 0.3s;
  }

  .accordion-item-title .icon-down-o.inverted {
    transform: rotate(180deg);
  }

  .accordion-item-content {
    background-color: #fff;
  }
</style>
