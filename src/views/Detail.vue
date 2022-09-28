<template>
  <div>
    <Content />
    <Footer />
  </div>
</template>

<script>
import Content from '@/components/detail/Content.vue';
import Footer from '@/components/detail/Footer.vue';
export default {
  components: {
    Content,
    Footer,
  },
  // created() {
  //   console.log(this.$route.query.id);
  // },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped></style>
