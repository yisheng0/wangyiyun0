<template>
  <router-view />
  <div v-show="$store.state.isFooterMusic">
    <footerMusic />
  </div>
</template>
<script>
import { mapState } from "vuex";
import footerMusic from "./components/item/footerMusic.vue";
export default {
  setup() {},
  components: {
    footerMusic,
  },
  // computed: {
  //   ...mapState(['isFooterMusic'])
  // }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.4rem;
  height: 0.4rem;
}
</style>
