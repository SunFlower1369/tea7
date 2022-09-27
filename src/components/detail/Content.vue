<template>
  <div class="swiper">
    <!-- 头部按钮 -->
    <div class="header">
      <div class="top1" v-if="isShow">
        <!-- <van-icon name="arrow-left" /> -->
        <i class="iconfont icon-zuojiantou" @click="goback()"></i>
        <i class="iconfont icon-shouye"></i>
      </div>
      <div v-else class="top2">
        <i class="iconfont icon-zuojiantou" @click="goback()"></i>
        <div>
          <span class="active">详情</span>
          <span>评价</span>
        </div>
        <i class="iconfont icon-shouye"></i>
      </div>
    </div>

    <div ref="wrapper">
      <div class="all" v-for="(item, index) in detailData" :key="index">
        <van-swipe @change="onChange" :autoplay="3000">
          <van-swipe-item>
            <img v-lazy="item.imgUrl" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/2
            </div>
          </template>
        </van-swipe>
        <!-- 名字和描述价格 -->
        <div class="title">
          <div class="name">{{ item.title }}</div>
          <div class="describe">
            {{ item.content }}
          </div>
          <van-divider />
          <div class="price">
            <div class="new">
              <span class="newpeice">{{ item.price }}</span
              ><span> / 100g</span>
            </div>
            <div class="old">
              <span>价格:</span><del>￥{{ item.price }}</del>
            </div>
          </div>
        </div>
        <img :src="item.imgUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  name: "",
  data() {
    return {
      BetterScroll: "",
      isShow: true,
      current: 0,
      detailData: {},
      id: 0,
    };
  },
  created() {
    // console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    this.getDetail();
  },
  mounted() {
    // this.BetterScroll = new BetterScroll(this.$refs.wrapper, {
    //   probeType: 3,
    //   click: true,
    // });
    // this.BetterScroll.on("scroll", (pos) => {
    //   console.log(pos);
    // });
  },

  methods: {
    onChange(index) {
      this.current = index;
    },
    goback() {
      this.$router.back();
    },
    async getDetail() {
      await api
        .axios({
          url: "api/getDetail",
          params: {
            id: this.$route.query.id,
          },
        })
        .then((res) => {
          // console.log(res);
          this.detailData = res.data;
        });
    },
  },
  //keepalive  的生命周期
  activated() {
    // console.log(this.id);
    if (this.id != this.$route.query.id) {
      this.getDetail();
      this.id = this.$route.query.id;
    }
  },
};
</script>

<style lang='less' scoped>
.swiper {
  height: calc(100vh - 50px);
  overflow: scroll;
  img {
    height: 20rem;
    width: 100%;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    .top1 {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      align-items: center;
      i {
        font-size: 1.3rem;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 0.3rem;
        border-radius: 50%;
      }
    }
    .top2 {
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      align-items: center;
      line-height: 1.5rem;
      background-color: #fff;
      span {
        display: inline-block;
        line-height: 2rem;
        padding: 0 1rem;
      }
      i {
        font-size: 1.3rem;
      }
    }
  }
  .title {
    margin: 0.5rem 1rem;
    .name {
      font-size: 1.125rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .describe {
      font-size: 0.875rem;
      color: #999;
      padding: 0.25rem 0;
    }
    .van-divider {
      margin: 0.5rem 0;
    }
    .price {
      .newpeice {
        color: #d22531;
        font-size: 1.25rem;
      }
      .newpeice::before {
        content: "￥";
        font-size: 1rem;
      }
      .old {
        font-size: 0.875rem;
        color: #999;
        margin: 0.3rem 0;
      }
    }
  }
}
.active {
  border-bottom: 0.125rem solid #d22531;
}
.custom-indicator {
  position: absolute;
  color: #fff;
  right: 10px;
  bottom: 10px;
  padding: 2px 5px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
