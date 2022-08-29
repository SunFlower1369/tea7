<template>
  <div class="icons">
    <!-- <van-grid :column-num="5" :border="false">
      <van-grid-item class="iconfont icon-cha" text="自饮茶" />
      <van-grid-item class="iconfont icon-lihe" text="品牌茶" />
      <van-grid-item class="iconfont icon-chaju" text="茶具" />
      <van-grid-item class="iconfont icon-fulizhongxin" text="领福利" />
      <van-grid-item class="iconfont icon-icon-auth" text="官方验证" />
    </van-grid> -->
    <div class="one" v-for="item in iconsList" :key="item.id">
      <i :class="item.icon"></i>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconsList: [
      ],
    };
  },
   created() {
    this.axios.get("/api/index_list").then((res) => {
      // console.log(res.data.data);
      this.iconsList = res.data.data.iconsList;
    });
  },
};
</script>

<style lang='less' scoped>
.icons {
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
  .one {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}
.iconfont {
  font-size: 2rem;
}
// /deep/.van-grid-item__content {
//   padding: 0;
// }
// /deep/.van-grid-item__text {
//   font-size: 1rem;
// }
</style>
