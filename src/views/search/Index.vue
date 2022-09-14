<template>
  <div>
    <Header />
    <div class="main">
      <div>
        <div class="history">
          <van-icon name="clock-o" class="icon" />
          <span>历史搜索</span>
          <span class="clear" @click="clear">清空历史记录</span>
          <ul>
            <li
              v-for="(item, index) in searchList"
              :key="index"
              @click="onSearch(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 这边是准备写推荐商品的 -->
      <!-- <div></div> -->
      <TitleCard>
        <span>推荐商品</span>
      </TitleCard>
      <div class="recommend">
        <ul>
          <li>
            <div class="pic"><img src="@/assets/images/like.png" alt="" /></div>
            <div class="title">云南凤庆经典蜜香滇红云南凤庆经典蜜香滇红</div>
            <div class="price">
              <span>￥</span>
              <b>222</b>
            </div>
          </li>
          <li>
            <div class="pic"><img src="@/assets/images/like.png" alt="" /></div>
            <div class="title">云南凤庆经典蜜香滇红</div>
            <div class="price">
              <span>￥</span>
              <b>222</b>
            </div>
          </li>
          <li>
            <div class="pic"><img src="@/assets/images/like.png" alt="" /></div>
            <div class="title">云南凤庆经典蜜香滇红</div>
            <div class="price">
              <span>￥</span>
              <b>222</b>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Like from "@/components/Like.vue";
import Tabbar from "@/components/Tabbar.vue";
import Header from "@/components/search/Header.vue";
import TitleCard from "@/components/home/TitleCard.vue";
import api from "@/api/index";
export default {
  components: {
    Like,
    Tabbar,
    Header,
    TitleCard,
  },
  data() {
    return {
      value: "",
      searchList: [],
    };
  },
  methods: {
    clear() {
      Dialog.confirm({
        title: "清空历史记录",
        message: "请问是否确认清空历史记录？",
      })
        .then(() => {
          // on confirm
          //这边只删除数组的话 本地存储没有删除刷新还是会显示数据  因此还要删除本地存储
          localStorage.removeItem("searchList");
          this.searchList = [];
        })
        .catch(() => {});
    },
    onSearch(item) {
      //尝试过使用params  可是没有实现
      this.$router.push({
        path: "/search/search-list",
        query: {
          key: item,
        },
      });
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem("searchList"));
  },
};
</script>

<style lang='less' scoped>
.main {
  .history {
    padding: 0.625rem;
    .icon {
      margin-right: 0.5rem;
      color: #b0352f;
    }
    .clear {
      float: right;
    }
    ul {
      display: flex;
      margin: 0.625rem 0;
      flex-wrap: wrap;
      // height: 9rem;
      // overflow: hidden;
      li {
        border: 0.0625rem #eee solid;
        padding: 0.25rem 0.5rem;
        margin: 0.4rem 0.8rem;
      }
    }
  }
}

.recommend {
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    width: 50%;
    margin-bottom: 1rem;
    box-sizing: border-box;
    padding: 0.25rem;
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
    color: #b0352f;
    margin: 0.5rem 0;
    b {
      font-size: 1.2rem;
    }
  }
}
</style>
