<template>
  <div class="advert">
    <div v-for="(item, index) in advertList" :key="index">
      <img :src="item.imgUrl" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    advertList: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.advert {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
