<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      class="van-list"
    >
      <van-cell
        v-for="(item, index) in goodsList"
        :key="index"
        class="van-cell"
      >
        <div class="pic">
          <img v-lazy="item.imgUrl" alt="" />
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="price">
          <div class="top">
            <span>￥</span>
            <b>{{ item.price }}</b>
          </div>
          <div>
            <van-button color="#b0352f" size="mini">立即购买</van-button>
          </div>
        </div>
        <!-- <template slot="finished"> meile </template> -->
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  // props: ["goodsList"],
  data() {
    return {
      loading: false,
      finished: false,
      goodsList: this.$parent.giveChild,
    };
  },
  created() {},
  methods: {
    getData() {
      api
        .axios({
          url: "/api/goodsList",
          params: {
            searchName: this.$route.query.key,
            ...this.$parent.orderBy,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.goodsList = res.data;
            // console.log(this.goodsList);
            this.finished = true;
          } else {
            this.$toast("暂无数据");
          }
        });
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.getData();

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 1000);
    },
  },
};
</script>

<style lang='less' scoped>
.van-list {
  display: flex;
  flex-wrap: wrap;
  .van-cell {
    width: 50%;
    box-sizing: border-box;
    padding: 0.25rem;
    border: 0.0625rem #eee solid;
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
    display: flex;
    justify-content: space-between;
    justify-items: center;
    color: #b0352f;
    margin: 0.5rem 0;
    align-items: center;
    b {
      font-size: 1.2rem;
    }
  }
}
</style>
