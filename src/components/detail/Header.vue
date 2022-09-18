<template>
  <div>
    <van-nav-bar>
      <template #title>
        <van-tabs>
          <van-tab v-for="index in 2" :title="'标签 ' + index" :key="index">
            {{ index }}
          </van-tab>
        </van-tabs>
      </template>
      <template #left>
        <i class="iconfont icon-zuojiantou"></i>
      </template>
      <template #right>
        <i class="iconfont icon-shouye"></i>
      </template>
    </van-nav-bar>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
.custom-indicator {
  position: absolute;
  color: #fff;
  right: 0.625rem;
  bottom: 0.625rem;
  padding: 0.125rem 0.3125rem;
  background: rgba(0, 0, 0, 0.1);
}
.all {
  height: calc(100vh - 3.125rem);
  overflow: scroll;
  img {
    height: 320px;
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
      padding: 8px 16px;
      align-items: center;
      i {
        -webkit-text-size-adjust: none;
        font-size: 20.8px;
        background-color: #ddd;
        padding: 4.8px;
        border-radius: 50%;
      }
    }
    .top2 {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      align-items: center;
      // line-height: 40px;
      // background-color: #fff;
      span {
        display: inline-block;
        line-height: 32px;
        padding: 0 16px;
      }
    }
  }
  .title {
    margin: 8px 16px;
    .name {
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .describe {
      font-size: 14px;
      color: #999;
      padding: 4px 0;
    }
    .van-divider {
      margin: 8px 0;
    }
    .price {
      .newpeice {
        color: #d22531;
        font-size: 20px;
      }
      .newpeice::before {
        content: "￥";
        font-size: 16px;
      }
      .old {
        font-size: 14px;
        color: #999;
        margin: 4.8px 0;
      }
    }
  }
}
</style>
