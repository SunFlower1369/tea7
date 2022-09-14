<template>
  <div class="list-left">
    <div class="left">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="你好" />
        <van-sidebar-item title="你好" />
        <van-sidebar-item title="你好" />
      </van-sidebar>
    </div>
    <div class="right">
      <van-grid>
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
    };
  },
};
</script>

<style lang='less' scoped>
.list-left {
  display: flex;
  .left {
    height: calc(100vh - 6.25rem);
    border-right: 1px solid #eee;
  }
  .right {
    flex: 1;
  }
}
.van-sidebar {
  width: auto;
}
.van-sidebar-item {
  background-color: transparent;
}
</style>
