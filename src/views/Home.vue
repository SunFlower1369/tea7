<template>
  <div class="home">
    <div class="headers">
      <Header>
        <template #left>
          <i class="iconfont icon-cha"></i>
        </template>
        <template #right>
          <i class="iconfont icon-kefu"></i>
        </template>
      </Header>
      <!-- <van-sticky :offset-top="50"> -->
      <div class="tab">
        <van-tabs sticky @click="onClick">
          <van-tab
            v-for="(item, index) in tabsList"
            :title="item.title"
            :key="index"
          >
            <div v-for="(item, index) in newData" :key="index">
              <Swiper
                v-if="item.type == 'swiperList'"
                :swiperList="item.data"
              />
              <Icons v-if="item.type == 'iconsList'" :iconsList="item.data" />
              <Hot v-if="item.type == 'hotList'" :hotList="item.data" />
              <Advert
                v-if="item.type == 'advertList'"
                :advertList="item.data"
              />
              <Like v-if="item.type == 'likeList'" :likeList="item.data" />
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <!-- </van-sticky> -->
    </div>

    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue";
import Swiper from "@/components/home/Swiper.vue";
import Header from "@/components/Header.vue";
import Icons from "@/components/home/Icons.vue";
import Hot from "@/components/home/Hot";
import Like from "@/components/Like.vue";
import Advert from "@/components/home/Advert";
import api from "@/api/index";
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
      newData: [],
    };
  },
  methods: {
    onClick(name) {
      this.addData(name);
    },
    async addData(name) {
      await api
        .axios({
          url: "/api/index_list/" + name,
        })
        .then((res) => {
          // console.log(typeof res.data.data); 无法判断
          //  constructor是Object类型的原型属性，它能够返回当前对象的构造器（类型函数）。利用该属性，可以检测复合类型数据的类型，如对象，数组和函数等。
          if (res.data.constructor != Array) {
            this.newData = Object.freeze(res.data.data);
          } else {
            this.newData = Object.freeze(res.data);
          }
        });
    },
    async getData() {
      await api
        .axios({
          url: "/api/index_list/0",
        })
        .then((res) => {
          this.tabsList = Object.freeze(res.data.tabsList);
          this.newData = Object.freeze(res.data.data);
        });
    },
  },
  created() {
    this.getData();
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

/deep/.van-tabs--line .van-tabs__wrap {
  height: 50px;
}
</style>

