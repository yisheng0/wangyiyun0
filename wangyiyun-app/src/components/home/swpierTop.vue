<template>
  <div id="swpierTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      images: [
        // "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        // "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });

    onMounted(() => {
      axios.get("http://localhost:3000/banner?type=2").then((res) => {
        console.log(res);
        // console.log(res.data.banners);
        state.images = res.data.banners;
      });
    });
    return { state };
  },
};
</script>

<style lang="less">
#swpierTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>
