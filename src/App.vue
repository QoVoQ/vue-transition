<template>
  <div id="app">
    <section>
      <trans-height-expand
        @after-enter="log">
        <div
          v-show="control[0].open"
          class="text">Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolores,
          explicabo ea veritatis fugiat sequi dolorem cupiditate aut rerum
          aliquid, voluptatem placeat amet doloremque aspernatur incidunt
          itaque. Officia est dolor saepe.</div>
      </trans-height-expand>
      <button @click="toggle(0)">toggle</button>
    </section>
    <section>
      <trans-fade-simple
        @after-leave="log">
        <div
          v-if="control[1].open"
          key="1"
          class="text">Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolores,
          explicabo ea veritatis fugiat sequi dolorem cupiditate aut rerum
          aliquid, voluptatem placeat amet doloremque aspernatur incidunt
          itaque. Officia est dolor saepe.</div>
        <div
          v-else
          key="2"
          class="text test">Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolores,
          explicabo ea veritatis fugiat sequi dolorem cupiditate aut rerum
          aliquid, voluptatem placeat amet doloremque aspernatur incidunt
          itaque. Officia est dolor saepe.
          Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolores,
          explicabo ea veritatis fugiat sequi dolorem cupiditate aut rerum
          aliquid, voluptatem placeat amet doloremque aspernatur incidunt
          itaque. Officia est dolor saepe.</div>
      </trans-fade-simple>
      <button @click="toggle(1)">toggle</button>
    </section>
    <section>
      <trans-fade-height
        :slidable="false"
        @after-enter="log">
        <div
          v-if="control[2].open"
          key="1"
          class="text">Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolores,
          explicabo ea veritatis fugiat sequi dolorem cupiditate aut rerum
          aliquid, voluptatem placeat amet doloremque aspernatur incidunt
          itaque. Officia est dolor saepe.</div>
        <div
          v-else
          key="2"
          class="text">Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolores,
          explicabo ea veritatis fugiat sequi dolorem cupiditate aut rerum
          aliquid, voluptatem placeat amet doloremque aspernatur incidunt
          itaque. Officia est dolor saepe.
          Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolores,
          explicabo ea veritatis fugiat sequi dolorem cupiditate aut rerum
          aliquid, voluptatem placeat amet doloremque aspernatur incidunt
          itaque. Officia est dolor saepe.</div>
      </trans-fade-height>
      <button @click="toggle(2)">toggle</button>
      <button @click="showLoading">show loading</button>
    </section>
    <nav>
      <router-link
        :to="{ name: 'va' }"
        class="link">to va</router-link>
      <router-link
        :to="{ name: 'vb' }"
        class="link">to vb</router-link>
      <router-link
        :to="{ name: 'vbSub' }"
        class="link">to vbSub</router-link>
    </nav>
    <trans-fade-height>
      <router-view class="router-view"/>
    </trans-fade-height>
    <p class="text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, opt
      io non. Exercitationem eos hic, adipisci commodi molestiae sint t
      empora fuga? A sint porro impedit voluptatibus? Repellat quidem
      cupiditate esse alias!
    </p>
    <section>
      <button @click="showDialog">dialog</button>
    </section>
    <section>
      <btn
        v-ripple
        :class="{ large: otherControl.large }"
        class="bd"
        @click="toast">show toast</btn>
    </section>
  </div>
</template>

<script>
import TransHeightExpand from './components/TransHeightExpand.vue';
import TransFadeSimple from './components/TransFadeSimple.vue';
import TransFadeHeight from './components/TransFadeHeight.vue';
import Confirmation from './components/Confirmation/Confirmation.vue';
import Btn from './components/Button.vue';

export default {
  name: 'App',
  components: {
    TransHeightExpand,
    TransFadeSimple,
    TransFadeHeight,
    Confirmation,
    Btn,
  },
  data() {
    return {
      control: Array(10).fill(0).map(() => ({ open: true })),
      otherControl: {
        large: false,
      },
    };
  },
  methods: {
    toggle(idx) {
      this.control[idx].open = !this.control[idx].open;
    },
    log() {
      console.log('Sth happened.11');
    },
    toast() {
      this.otherControl.large = !this.otherControl.large;
      this.$toast(`${new Date()} 来自toast`);
    },
    showDialog() {
      this.$confirm({
        title: 'Care you',
        msg: 'Are you ok ?',
        isSingleBtn: false,
        showClose: true,
        confirmBtnText: 'ok',
        cancelBtnText: 'cancel',
      })
        .then(() => {
          console.log('confirmed.');
        })
        .catch(() => {
          console.log('rejected.');
        });
    },
    showLoading() {
      this.$loading('sdfer');
      setTimeout(() => {
        this.$loading(false);
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
  @import '~@/styles/animation.scss';
  @import '~@/styles/utils.scss';
  @import '~@/styles/widgets.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  * {
    box-sizing: border-box;
  }

  ul {
    margin: 0;
    padding: 0;
  }
</style>

<style lang="scss" scoped>
  @import '~@/styles/utils.scss';
  .link {
    display: block;
    color: red;
  }

  .text {
    max-width: 50%;
    margin: auto;
  }

  .dialog-ctn {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    @extend %flex-center;
    background: rgba(0, 0, 0, 0.1);
  }

  .dialog {
    background: purple;
  }

  .large {
    width: 70px;
    height: 70px;
  }

  .bd {
    border: 1px solid red;
  }
</style>

