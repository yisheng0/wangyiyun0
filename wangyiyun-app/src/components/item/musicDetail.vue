<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div>
        <p>{{ musicList.al.name }}</p>
        <span v-for="item in musicList.ar" :key="item">
          {{ item.name }}
        </span>
        <svg class="icon liebiao" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricshow">
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_ar"
      :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
      @click="isLyricshow = true"
    />
  </div>
  <div class="msicLyric" ref="musicLyric" v-show="isLyricshow">
    <p
      v-for="item in lyric"
      :key="item"
      ref="p"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="dedatailFooter">
    <div class="footerTop">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-xihuan1"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-changpian"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-pinglun1"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-24gl-repeatOnce2"></use>
      </svg>
    </div>
    <div class="footerContent"></div>
    <div class="footer">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="goplay(-1)">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <!-- <svg class="icon liebiao" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg> -->
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
      <svg class="icon liebiao" aria-hidden="true" @click="goplay(1)">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { mapMutations, mapState } from "vuex";
export default {
  setup(props) {
    let isLyricshow = ref(false);
    return { isLyricshow };
  },
  computed: {
    ...mapState(["lyricList", "currentTime", " playListIndex", " playList"]),
    lyric: function () {
      let arr;
      if (this.lyricList) {
        arr = this.lyricList.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,Number(mill),lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      console.log(arr);
      return arr;
    },
  },
  mounted() {
    console.log(this.musicList);
  },
  props: ["musicList", "play", "isbtnShow"],
  methods: {
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
    backHome: function () {
      this.updateDetailShow();
      this.isLyricshow = false;
    },
    goplay: function (num) {
      let index = this.playListIndex + num;
      // console.log(playList);
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index > this.playList.length) {
        index = 0;
      }

      this.updatePlayListIndex(index);
    },
  },
  watch: {
    currentTime: function (val) {
      let p = document.querySelector("p.active");
      console.log(p);
      if (p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(80px);
}
.detailTop {
  width: 100%;
  height: 1.4rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .detailTopLeft {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      display: flex;
      align-items: center;
      // padding-left: 0.2rem;
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      p {
        padding-right: 0.1rem;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.msicLyric {
  width: 100%;
  height: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.3px;
  overflow: scroll;
  p {
    color: #141517;
    margin-bottom: 0.4rem;
  }
  .active {
    color: aliceblue;
    font-size: 0.49rem;
  }
}
.dedatailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // .icon {
    //   width: 0.36rem;
    //   height: 0.36rem;
    //   fill: rgb(31, 5, 5);
    // }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(27, 9, 9);
      width: 0.6rem;
      height: 0.6rem;
    }
    // .bofang {
    //   width: 1rem;
    //   height: 1rem;
    // }
  }
}
</style>
