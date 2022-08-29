<template>
  <div class="header">
    <div class="logo"><i class="iconfont icon-cha"></i></div>
    <div class="search">
      <!-- <i class="iconfont icon-sousuo"></i>
      <span>搜索您喜欢的...</span> -->
      <van-search placeholder="搜索您喜欢的..." />
    </div>
    <div class="service">
      <i class="iconfont icon-kefu"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style lang='less' scoped>
i {
  font-size: 1.6rem;
  color: #fff;
}
.header {
  display: flex;
  justify-content: space-around;
  background-color: #b0352f;
  align-items: center;
  .search {
    width: 80%;
    padding: 0.5rem 0;
  }
}
.van-search {
  padding: 0;
}
.van-search__content {
  border-radius: 2rem;
}
</style>
