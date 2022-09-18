<template>
  <div>
    <!-- <Swiper /> -->
    <Content />
    <Footer />
  </div>
</template>

<script>
import Swiper from "@/components/detail/SwiperDetail.vue";
import Content from "@/components/detail/Content.vue";
import Footer from "@/components/detail/Footer.vue";
export default {
  components: {
    Swiper,
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

<style lang='less' scoped>
</style>
