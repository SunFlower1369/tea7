<template>
  <div class="swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in swiperList" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';

Vue.use(Lazyload);
export default {
  name: '',
  props: {
    swiperList: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.swiper {
  height: 12.7581rem;
  width: 100%;
  img {
    height: 12.7581rem;
    width: 100%;
  }
}
</style>
