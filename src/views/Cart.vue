<template>
  <div class="cart">
    <!-- 头部 -->
    <div class="header">
      <div @click="goback" class="left-right">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div>购物车</div>
      <div class="left-right">编辑</div>
    </div>
    <!-- 上方通知栏 -->
    <van-notice-bar
      left-icon="volume-o"
      text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    />
    <!-- 商品信息 -->
    <div class="goods-info" v-if="list">
      <div class="all">
        <van-checkbox
          :value="isCheckAll"
          checked-color="#b0352f"
          @click="checkAllFun"
          >商品</van-checkbox
        >
      </div>
      <div class="goods-one" v-for="(item, index) in list" :key="index">
        <van-checkbox
          v-model="item.checked"
          checked-color="#b0352f"
          class="mar"
          @click="checkOne(index)"
        ></van-checkbox>
        <van-card
          :price="item.goods_price.toFixed(2)"
          :thumb="item.goods_imgUrl"
          class="info"
        >
          <template #title>
            <div class="title">
              <span>{{ item.goods_name }}</span>
              <i class="iconfont icon-lajitong" @click="deleteGoods"></i>
            </div>
          </template>
          <template #footer>
            <van-stepper :value="item.goods_num" integer />
          </template>
        </van-card>
      </div>
    </div>
    <div v-else class="noCart">
      <i class="iconfont icon-liwuhuodong"></i>
      <span>购物车暂无数据</span>
    </div>
    <!-- 底部结算等 -->
    <div class="footer">
      <van-submit-bar
        :price="totalPrice"
        button-text="去结算"
        @submit="onSubmit"
      >
        <van-checkbox
          :value="isCheckAll"
          checked-color="#b0352f"
          @click="checkAllFun"
          >全选</van-checkbox
        >
      </van-submit-bar>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue';
import api from '@/api/index';
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
export default {
  components: {
    Tabbar,
  },
  data() {
    return {};
  },
  created() {
    this.getCartList();
  },
  computed: {
    ...mapState({
      list: (state) => state.cartList.cartList,
    }),
    ...mapGetters(['isCheckAll', 'totalPrice']),
  },
  methods: {
    ...mapMutations(['cartList', 'checkOne']),
    ...mapActions(['checkAllFun']),
    onSubmit() {},
    deleteGoods() {
      console.log('删除');
    },
    goback() {
      this.$router.back();
    },
    async getCartList() {
      await api
        .axios({
          url: '/api/getCartList',
          headers: {
            token: true,
          },
        })
        .then((res) => {
          // console.log( res.data);
          res.data.forEach((res) => {
            res['checked'] = true;
          });
          this.cartList(res.data);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  line-height: 2.75rem;
  background-color: #b0352f;
  color: #fff;
  .left-right {
    margin: 0 1rem;
  }
}

.goods-info {
  .all {
    margin: 0.5rem 1rem;
  }
  .goods-one {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.8rem;
    margin-bottom: 0.3rem;
    background-color: #fafafa;
    .mar {
      margin: 0 0.5rem 0 0;
    }
    .info {
      flex: 1;
    }
    .title {
      display: flex;
      justify-content: space-between;
    }
  }
}

.noCart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  i {
    font-size: 8rem;
    color: #dddddd;
  }
  span {
    color: #9e9e9e;
  }
}

.van-submit-bar {
  margin-bottom: 3.125rem;
}

.van-submit-bar__bar {
  border: 0.0625rem solid #eee;
}
.van-card {
  padding: 0;
  font-size: 1rem;
}

.van-card__content {
  justify-content: space-around;
}
</style>
