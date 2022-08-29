<template>
  <div class="tabs">
    <van-tabbar route>
      <van-tabbar-item class="iconfont icon-shouye" to="/">
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item class="iconfont icon-icon" to="/list">
        <span>分类</span>
      </van-tabbar-item>
      <van-tabbar-item class="iconfont icon-gouwuche" to="/cart">
        <span>购物车</span>
      </van-tabbar-item>
      <van-tabbar-item class="iconfont icon-wode" to="/my"
        ><span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style lang='less' scoped>
.tabs {
  height: 3.125rem;
  span {
    font-size: 1rem;
  }
}
.van-tabbar-item--active {
  color: #b54f4a;
}
.iconfont {
  font-size: 1.2rem;
}
</style>
