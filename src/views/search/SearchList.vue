<template>
  <div class="search-list">
    <div class="header-search">
      <Header />
      <!-- <van-sticky :offset-top="54">
        <ConditionTab />
      </van-sticky> -->
      <van-sticky :offset-top="54">
        <div class="condition">
          <ul>
            <li
              v-for="(item, index) in conditionList.data"
              :key="index"
              @click="change(index)"
            >
              <div :class="conditionList.currentIndex == index ? 'active' : ''">
                {{ item.name }}
              </div>
              <div class="icon" v-if="index != 0">
                <i
                  class="iconfont icon-shangjiantou"
                  :class="item.status == 1 ? 'active' : ''"
                ></i>
                <i
                  class="iconfont icon-xiajiantou"
                  :class="item.status == 2 ? 'active' : ''"
                ></i>
              </div>
            </li>
          </ul>
        </div>
      </van-sticky>
    </div>
    <div class="list">
      <ul>
        <li v-for="item in goodsList" :key="item.id">
          <div class="pic">
            <img v-lazy="item.imgUrl" alt="" />
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="price">
            <div class="top">
              <span>￥</span>
              <b>{{ item.price }}</b>
            </div>
            <div>
              <van-button color="#b0352f" size="mini">立即购买</van-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <SearchListVantLoading /> -->
    <Tabbar />
  </div>
</template>

<script>
import Like from "@/components/Like.vue";
import Tabbar from "@/components/Tabbar.vue";
import Header from "@/components/search/Header.vue";
import TitleCard from "@/components/home/TitleCard.vue";
import ConditionTab from "@/components/search/ConditionTab.vue";
import SearchListVantLoading from "@/components/search/SearchListVantLoading";
import api from "@/api/index";

export default {
  components: {
    Like,
    Tabbar,
    Header,
    TitleCard,
    ConditionTab,
    SearchListVantLoading,
  },
  data() {
    return {
      goodsList: [],
      conditionList: {
        currentIndex: 0,
        data: [
          //如果是status = 0 都不亮  1 上亮 2下亮
          { name: "综合", status: 0, key: "title" },
          { name: "价格", status: 0, key: "price" },
          { name: "销量", status: 0, key: "count" },
        ],
      },
      loading: false,
      finished: false,
    };
  },
  computed: {
    orderBy() {
      //知道是哪一个对象
      let obj = this.conditionList.data[this.conditionList.currentIndex];
      //判断是升还是降
      let val = obj.status == 1 ? "asc" : "desc"; //这句有问题   总是只赋值后面  已解决
      return {
        [obj.key]: val,
      };
    },
    // giveChild(){
    //   return this.goodsList
    // }
  },
  created() {
    this.getData();
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.getData();

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
      }, 1000);
    },
    getData() {
      api
        .axios({
          url: "/api/goodsList",
          params: {
            searchName: this.$route.query.key,
            ...this.orderBy,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.goodsList = res.data;
            this.finished = true;
            // console.log(this.goodsList);
          } else {
            this.$toast("暂无数据");
          }
        });
    },
    change(index) {
      this.conditionList.currentIndex = index;
      // console.log(this.conditionList.currentIndex);
      // console.log(index);
      //取消除点击外的所有的状态===》status设置为0
      let item = this.conditionList.data[index];
      this.conditionList.data.forEach((v, i) => {
        if (i != index) {
          v.status = 0;
          // console.log(this.conditionList.data);
        }
      });
      if (index == this.conditionList.currentIndex) {
        this.conditionList.data[index].status = item.status == 1 ? 2 : 1;
        // console.log(this.conditionList.data);
        // console.log(this.conditionList.data[index].status);
      }
      this.getData();
    },
  },
};
</script>

<style lang='less' scoped>
i {
  color: gray;
  font-size: 0.625rem;
}
// 头部条件筛选
.condition {
  ul {
    display: flex;
    justify-content: space-around;
    background-color: #eee;
    align-items: center;
    line-height: 1rem;
    li {
      display: flex;
      align-items: center;
      .icon {
        display: flex;
        flex-direction: column;
        margin: 0 0.1875rem;
      }
    }
  }

  .price {
    display: flex;
    align-items: center;
    .arrow {
      display: flex;
      flex-direction: column;
      margin: 0 0.3125rem;
    }
  }
}

.list {
  // margin-top: 2rem;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    width: 50%;
    box-sizing: border-box;
    padding: 0.25rem;
    border: 0.0625rem #eee solid;
  }
  .pic {
    width: 12.1644rem;
    height: 12.1644rem;
  }
  .pic img {
    width: 100%;
  }
  .title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .price {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    color: #b0352f;
    margin: 0.5rem 0;
    align-items: center;
    b {
      font-size: 1.2rem;
    }
  }
}
.active {
  color: red;
}

.van-list {
  display: flex;
  flex-wrap: wrap;
  .van-cell {
    width: 50%;
    box-sizing: border-box;
    padding: 0.25rem;
    border: 0.0625rem #eee solid;
  }
  .pic {
    width: 12.1644rem;
    height: 12.1644rem;
  }
  .pic img {
    width: 100%;
  }
  .title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .price {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    color: #b0352f;
    margin: 0.5rem 0;
    align-items: center;
    b {
      font-size: 1.2rem;
    }
  }
}

/deep/.van-list__loading {
  margin: 0 auto;
}
</style>
