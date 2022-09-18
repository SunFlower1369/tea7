<template>
  <div class="swiper">
    <!-- 头部按钮 -->
    <div class="header">
      <div class="top1" v-if="isShow">
        <!-- <van-icon name="arrow-left" /> -->
        <i class="iconfont icon-zuojiantou"></i>
        <i class="iconfont icon-shouye"></i>
      </div>
      <div v-else class="top2">
        <i class="iconfont icon-zuojiantou"></i>
        <div>
          <span class="active">详情</span>
          <span>评价</span>
        </div>
        <i class="iconfont icon-shouye"></i>
      </div>
    </div>

    <div class="all">
      <van-swipe @change="onChange" :autoplay="3000">
        <van-swipe-item v-for="item in swiperList" :key="item">
          <img v-lazy="item" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/4</div>
        </template>
      </van-swipe>
      <!-- 名字和描述价格 -->
      <div class="title">
        <div class="name">消青工艺浓香铁观音2号</div>
        <div class="describe">
          花香更显，色更油亮，香甜饱满，属于浓香型优品口粮茶。
        </div>
        <van-divider />
        <div class="price">
          <div class="new">
            <span class="newpeice">价格</span><span> / 100g</span>
          </div>
          <div class="old"><span>价格:</span><del>￥200</del></div>
        </div>
      </div>
      <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" alt="" />
      <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      isShow: false,
      current: 0,
      swiperList: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
    };
  },

  methods: {
    onChange(index) {
      this.current = index;
    },
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
        -webkit-text-size-adjust: none;
        font-size: 1.3rem;
        background-color: #ddd;
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
