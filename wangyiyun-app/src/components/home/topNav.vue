<template>
  <div id="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan1"></use>
      </svg>
    </div>

    <div class="topContent">
      <span @click="$router.push('/InfoUser')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/Search')">
        <use xlink:href="#icon-sousuo1"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#topNav {
  padding: 0.2rem;
  height: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topContent {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.36rem;
    .active {
      font-weight: 900;
    }
  }
}
</style>
