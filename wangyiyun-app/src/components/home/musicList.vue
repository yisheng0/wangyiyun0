<template>
  <div id="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swpie"
        :show-indicators="false"
      >
        <van-swipe-item v-for="massage in musicList.massages" :key="massage">
          <router-link
            :to="{
              path: '/itemMusic',
              query: { id: massage.id },
            }"
          >
            <img :src="massage.picUrl" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang1"></use>
              </svg>
              {{ changeCount(massage.playCount) }}
            </span>
            <span class="name">{{ massage.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive } from "vue";
export default {
  setup() {
    const musicList = reactive({
      massages: [],
    });
    onMounted(() => {
      axios.get("http://localhost:3000/personalized?limit=10").then((res) => {
        console.log(res.data.result);
        // console.log(res.data.banners);
        musicList.massages = res.data.result;
      });
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { musicList, changeCount };
  },
};
//   setup() {
//     const state = reactive({
//       musicList: [],
//     });
//     function changeCount(num) {
//       if (num >= 100000000) {
//         return (num / 100000000).toFixed(1) + "亿";
//       } else if (num >= 10000) {
//         return (num / 10000).toFixed(1) + "万";
//       }
//     }
//     onMounted(async () => {
//       let res = await getMusicList();
//       console.log(res);
//       state.musicList = res.data.result;
//     });
//     return { state, changeCount };
//   },
// };
</script>

<style lang="less" scoped>
#musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 200px;
    .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
    }
    .my-swpie {
      height: 100%;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          font-weight: 900;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
      }
    }
  }
}
</style>
