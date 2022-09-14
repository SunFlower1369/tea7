<template>
  <div class="list">
    <Header>
      <template #left>
        <van-icon name="arrow-left" />
      </template>
      <template #right>
        <i class="iconfont icon-shouye"></i>
      </template>
    </Header>
    <ListContent />
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import Header from "@/components/Header.vue";
import ListContent from "@/components/list/ListContent.vue";
export default {
  components: {
    Tabbar,
    Header,
    ListContent,
  },
  methods: {
    onClick(name, title) {
      console.log(name, title);
    },
  },
};
</script>
<style lang='less' scoped>
</style>

