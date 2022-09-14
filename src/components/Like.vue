<template>
  <div class="like">
    <div>
      <!-- 这边是插槽  到时候可以根据自己的需求更换标题  span -->
      <TitleCard>
        <span>猜你喜欢</span>
      </TitleCard>
    </div>
    <!-- <van-grid :gutter="10" :column-num="2" >
      <van-grid-item
        v-for="value in 8"
        :key="value"
        icon="photo-o"
        text="文字"
      />
    </van-grid> -->
    <div class="like-one">
      <ul>
        <li v-for="item in likeList" :key="item.id">
          <div class="pic"><img :src="item.imgUrl" alt="" /></div>
          <div class="title">{{ item.title }}</div>
          <div class="price">
            <span>￥</span>
            <b>{{ item.price }}</b>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TitleCard from "@/components/home/TitleCard.vue";
export default {
    props: {
    likeList: Array,
  },
  components: {
    TitleCard,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang='less' scoped>
.like {
  .like-one {
    ul {
      display: flex;
      flex-wrap: wrap;
    }
    li {
      width: 50%;
      margin-bottom: 1rem;
      box-sizing: border-box;
      padding: 0.25rem;
    }
    .pic {
      width: 12.1644rem;
      height: 12.1644rem;
    }
    .pic img {
      width: 100%;
    }
    .title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price {
      color: #b0352f;
      margin: 0.5rem 0;
      b {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
