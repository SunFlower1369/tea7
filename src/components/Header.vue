<template>
  <div class="header">
    <div class="logo">
      <slot name="left"> </slot>
    </div>
    <div class="search" @click="search">
      <van-search placeholder="搜索您喜欢的..." />
    </div>
    <div class="service">
      <slot name="right"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  methods: {
    search() {
      this.$router.push('/search');
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-around;
  background-color: #b0352f;
  align-items: center;
  .search {
    width: 80%;
    padding: 0.5rem 0;
  }
  i {
    font-size: 1.3rem;
    color: #fff;
  }
}
.van-search {
  padding: 0;
}
.van-search__content {
  border-radius: 2rem;
}
</style>
