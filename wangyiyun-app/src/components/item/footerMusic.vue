<template>
  <div class="FooterMusic">
    <div class="footLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横划切换上下首</span>
      </div>
    </div>
    <div class="footRight">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="play"
        v-if="isbtnShow"
      >
        <use xlink:href="#icon-circle-play"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-caidan1"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
  </div>
  <van-popup
    v-model:show="detailShow"
    position="bottom"
    :style="{ height: '100%', width: '100%' }"
  >
    <musicDetail
      :musicList="playList[playListIndex]"
      :play="play"
      :isbtnShow="isbtnShow"
    />
  </van-popup>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { musicDetail } from "@/components/item/musicDetail.vue";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    // this.upgateTime();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
  },
  methods: {
    upgateTime: function () {
      this.interVal = setTimeout(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
        setTimeout(this.upgateTime(), 100);
      }, 100);
    },
    play: function () {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        // this.upgateTime;
        this.upgateTime();
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal);
      }
    },

    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
    ]),
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  watch: {
    playListIndex: function (newVal, oldVal) {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
      }
    },
    playList: function (newVal, oldVal) {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
  components: { musicDetail },
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #f7f7f7;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
