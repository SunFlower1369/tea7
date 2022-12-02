<template>
  <div class="cart">
    <!-- 头部 -->
    <div class="header">
      <div @click="goback" class="left-right">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div>购物车</div>
      <div
        class="left-right"
        @click="isEditBar"
        v-text="isEdit ? '编辑' : '完成'"
      ></div>
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
              <i
                class="iconfont icon-lajitong"
                @click="deleteGoods(item.id)"
              ></i>
            </div>
          </template>
          <template #footer>
            <van-stepper
              :value="item.goods_num"
              integer
              @change="updateCount({ $event, item })"
            />
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
        v-if="isEdit"
        :price="totalPrice.totalPrice"
        button-text="去结算"
        @submit="onSubmit(selectList)"
      >
        <van-checkbox
          :value="isCheckAll"
          checked-color="#b0352f"
          @click="checkAllFun"
          >全选</van-checkbox
        >
      </van-submit-bar>
      <!-- 这里是点击编辑后的底部 -->
      <div v-else class="editFooter">
        <van-submit-bar button-text="删除" @submit="deleteGoods">
          <van-checkbox
            :value="isCheckAll"
            checked-color="#b0352f"
            @click="checkAllFun"
            >全选</van-checkbox
          >
        </van-submit-bar>
      </div>
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
    return {
      isEdit: true,
    };
  },
  created() {
    this.getCartList();
    // console.log(this.selectList);
  },
  computed: {
    ...mapState({
      list: (state) => state.cart.cartList,
      selectList: (state) => state.cart.selectList,
    }),
    ...mapGetters(['isCheckAll', 'totalPrice']),
  },
  methods: {
    ...mapMutations(['cartList', 'checkOne']),
    ...mapActions(['checkAllFun', 'deleteGoods', 'updateCount']),
    //结算
    onSubmit(selectList) {
      // console.log(selectList);
      if (!selectList.length) {
        this.$toast('请至少选择一件商品');
        return;
      }
      let newList = [];
      this.list.forEach((item) => {
        // selectList中存的是ID
        this.selectList.filter((v) => {
          if (v == item.id) {
            newList.push(item);
          }
        });
      });

      api
        .axios({
          url: '/api/addOrder',
          headers: {
            token: true,
          },
          params: {
            OrderList: JSON.stringify(newList),
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.$router.push({
              path: '/order',
              query: {
                selectList: JSON.stringify(selectList),
              },
            });
          }
        });
    },
    goback() {
      this.$router.back();
    },
    //获取购物车列表
    async getCartList() {
      await api
        .axios({
          url: '/api/getCartList',
          headers: {
            token: true,
          },
        })
        .then((res) => {
          res.data.forEach((res) => {
            res['checked'] = true;
          });
          this.cartList(res.data);
        });
    },
    isEditBar() {
      this.isEdit = !this.isEdit;
    },
    //更新数量
    // updateCount(value, id) {
    //   // console.log(value, id);
    //   api
    //     .axios({
    //       url: '/api/updateCount',
    //       headers: {
    //         token: true,
    //       },
    //       params: {
    //         goods_num: value,
    //         id,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     });
    // },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  line-height: 44px;
  background-color: #b0352f;
  color: #fff;
  .left-right {
    margin: 0 16px;
  }
}

.goods-info {
  .all {
    margin: 8px 16px;
  }
  .goods-one {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12.8px;
    margin-bottom: 4.8px;
    background-color: #fafafa;
    .mar {
      margin: 0 8px 0 0;
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
  padding-top: 48px;
  i {
    font-size: 128px;
    color: #dddddd;
  }
  span {
    color: #9e9e9e;
  }
}

.van-submit-bar {
  margin-bottom: 50px;
}

.van-submit-bar__bar {
  border: 1px solid #eee;
  justify-content: space-between;
}
.van-card {
  padding: 0;
  font-size: 16px;
}

.van-card__content {
  justify-content: space-around;
}

.editFooter {
  display: flex;
  justify-content: space-between;
}
</style>
