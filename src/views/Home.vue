<template>
  <div class="home">
    <div class="headers">
      <Header />
      <div class="tab">
        <van-tabs sticky @change="changeTabs">
          <van-tab v-for="(item, index) in tabsList" :title="item" :key="index">
            <Swiper />
            <Icons />
            <Hot />
            <Advert />
            <Like />
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import Swiper from "@/components/home/Swiper.vue";
import Header from "@/components/home/Header.vue";
import Icons from "@/components/home/Icons.vue";
import Hot from "@/components/home/Hot";
import Like from "@/components/home/Like.vue";
import Advert from "@/components/home/Advert";
export default {
  components: {
    Tabbar,
    Swiper,
    Header,
    Icons,
    Hot,
    Like,
    Advert,
  },
  data() {
    return {
      tabsList: [],
    };
  },
  methods: {
    changeTabs(name, title) {
      console.log(name, title);
    },
    // onClick(name, title){
    //   console.log(name, title);
    // }
  },
  created() {
    this.axios.get("/api/index_list").then((res) => {
      console.log(res.data.data);
      this.tabsList = res.data.data.tabsList;
    });
  },
};
</script>
<style lang='less' scoped>
.headers {
}
/deep/.van-tab--active {
  color: #b54f4a;
}
/deep/.van-tabs__line {
  background-color: #b54f4a;
}
</style>

