<template>
  <div class="hot">
    <div>
      <!-- 这边是插槽  到时候可以根据自己的需求更换标题  span -->
      <TitleCard>
        <span>爆款推荐</span>
      </TitleCard>
    </div>
    <div class="one" v-for="item in hotList" :key="item.id">
      <img :src="item.imgUrl" alt="" />
      <div class="info">
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
      </div>
      <div class="price">
        <h2>{{ item.price }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import TitleCard from '@/components/home/TitleCard.vue';
export default {
  components: {
    TitleCard,
  },
  props: {
    hotList: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.hot {
  text-align: center;
  h1 {
    margin-bottom: 0.5rem;
  }
  .one {
    position: relative;
    margin: 0.2rem 0;
    img {
      width: 24.875rem;
      height: 9.9375rem;
      border-radius: 1rem;
    }
    .info {
      position: absolute;
      right: 1rem;
      top: 0;
      text-align: right;
    }
    .price {
      position: absolute;
      bottom: 2rem;
      right: 1rem;
      color: #b54f4a;
    }
  }
}
</style>
