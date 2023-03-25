<template>
  <div>
    <topNav />
    <swpierTop />
    <iconList />
    <musicList />
  </div>
</template>

<script>
// @ is an alias to /src
import topNav from "@/components/home/topNav.vue";
import swpierTop from "@/components/home/swpierTop.vue";
import iconList from "@/components/home/iconList.vue";
import musicList from "@/components/home/musicList.vue";

export default {
  name: "HomeView",
  components: {
    topNav,
    swpierTop,
    iconList,
    musicList,
  },
};
</script>
