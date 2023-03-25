<template>
  <itemMusicTop :playList="state.playList" />
  <itemMusicList
    :itemList="state.itemList"
    :subscribedCount="state.playList.subscribedCount"
  />
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import axios from "axios";
import itemMusicTop from "@/components/item/itemMusicTop.vue";
import itemMusicList from "@/components/item/itemMusicList.vue";
export default {
  setup() {
    const state = reactive({
      playList: [], //歌单详情页数据
      itemList: [], //歌曲数据
    });
    onMounted(() => {
      let id = useRoute().query.id;
      axios
        .get(`http://localhost:3000/playlist/detail?id=${id}`)
        .then((res) => {
          console.log(res.data);
          state.playList = res.data.playlist;
        });
      axios
        .get(
          `http://localhost:3000/playlist/track/all?id=${id}&limit=${10}&offset=${0}`
        )
        .then((res) => {
          console.log(res.data);
          state.itemList = res.data.songs;
        });
    });
    return { state };
  },
  components: {
    itemMusicTop,
    itemMusicList,
  },
};
</script>

<style></style>
