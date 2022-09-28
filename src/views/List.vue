<template>
  <div class="list">
    <van-sticky>
      <Header>
        <template #left>
          <van-icon name="arrow-left" />
        </template>
        <template #right>
          <i class="iconfont icon-shouye"></i>
        </template>
      </Header>
    </van-sticky>
    <List class="scroll" />
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue';
import Header from '@/components/Header.vue';
import List from '@/components/list/index.vue';
export default {
  components: {
    Tabbar,
    Header,
    List,
  },
  methods: {},
};
</script>
<style lang="less" scoped>
// .scroll{
//   overflow: scroll;
//   height: 100%;
// }
</style>
