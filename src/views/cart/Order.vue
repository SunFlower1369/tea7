<template>
  <div class="order">
    <Header>
      <span>提交订单</span>
    </Header>
    <section>
      <div class="address">
        <p class="address-title">收货信息：</p>
        <van-address-list
          :list="addressList"
          @edit="changeAddress"
          :switchable="false"
        />
      </div>

      <!-- 商品信息 -->
      <van-card
        v-for="(item, index) in goodsListInfo"
        :key="index"
        :num="item.goods_num"
        :price="item.goods_price"
        :title="item.goods_name"
        :thumb="item.goods_imgUrl"
      />
      <!-- 优惠券 -->
      <!-- <Coupons class="coupons" /> -->
      <!-- 账单明细 -->
      <div class="order-info">
        <p>账单明细</p>
        <van-swipe-cell>
          <van-cell
            :border="false"
            title="订单总价："
            :value="totalPrice.totalPrice / 100"
          />
          <van-cell :border="false" title="运费：" value="内容" />
          <van-cell :border="false" title="优惠券：" value="内容" />
          <van-cell :border="false" title="实付款：" value="内容" />
        </van-swipe-cell>
      </div>

      <!-- 付款方式 -->
      <Payment class="payment" />
    </section>
    <div class="footer">
      <van-submit-bar
        :price="totalPrice.totalPrice"
        button-text="提交订单"
        @submit="buy"
        tip-icon="volume-o"
      >
        <template #tip> 此订单15分钟内未付款将自动关闭! </template>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import Header from '@/components/login/LoginHeader.vue';
import Payment from '@/components/cart/Payment.vue';
import Coupons from '@/components/cart/Coupons.vue';
import api from '@/api/index';

export default {
  components: {
    Header,
    Payment,
    Coupons,
  },
  computed: {
    ...mapState({
      list: (state) => state.cart.cartList,
    }),
    ...mapGetters(['totalPrice', 'defaultAddress']),
    goodsListInfo() {
      return this.goodsList.map((id) => {
        return this.list.find((v) => v.id == id);
      });
    },
  },
  data() {
    return {
      // radioPayment: 'ali',
      addressList: [],
      goodsList: [],
    };
  },
  created() {
    //选中的商品id
    this.goodsList = JSON.parse(this.$route.query.selectList);
    // console.log(this.goodsList, this.$store.state.list);
    this.getAddressIndex();
    // this.price();
  },
  methods: {
    ...mapMutations(['getAddress']),
    //提交订单
    buy() {
      console.log('买买买');
    },
    //切换地址
    changeAddress() {
      console.log('我在切换地址');
    },

    //获取地址
    async getAddressIndex() {
      await api
        .axios({
          url: '/api/getAddress',
          headers: {
            token: true,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.getAddress(res.data);
          let list = [];
          //有默认收货地址
          if (this.defaultAddress.length) {
            this.defaultAddress.forEach((v) => {
              let address =
                v.province + v.city + v.county + ' ' + v.addressDetail;
              list.push(Object.assign({}, v, { address: address }));
            });
            this.addressList = list;
            // console.log(this.list);
          } else {
            res.data.forEach((v) => {
              let address =
                v.province + v.city + v.county + ' ' + v.addressDetail;
              list.push(Object.assign({}, v, { address: address }));
            });
            this.addressList = list;
            // console.log(this.list);
          }

          // if (res.status == 200) {
          //   let list = [];
          //   res.data.forEach((v) => {
          //     let address =
          //       v.province + v.city + v.county + ' ' + v.addressDetail;
          //     list.push(Object.assign({}, v, { address: address }));
          //   });
          //   // console.log(list);
          //   this.getAddress(list);
          // } else {
          //   this.$toast(res.msg);
          // }
        });
    },

    //计算价格
    // async price() {
    //   this.goodsList.forEach((v) => {
    //     return (this.allPrice += v.goods_num * v.goods_price * 100);
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
.order {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  section {
    flex: 1;
    background-color: #f7f7f7;
    .address {
      .address-title {
        padding: 0.3125rem 0.625rem;
      }
      .address-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.625rem;
        background-color: #fff;
        span {
          margin-right: 0.625rem;
        }
      }
      // .address-info::after {
      // }
    }
    .payment {
      background-color: #fff;
      margin-top: 0.625rem;
      // padding: 0.625rem;
      .select-payment {
        margin-top: 0.625rem;
      }
    }
    .order-info {
      p {
        margin: 0.625rem 0 0.5rem 0.625rem;
      }
    }
  }
  .coupons {
    margin-top: 0.625rem;
  }
}
.van-address-item {
  padding-left: 1.25rem;
}
.van-submit-bar__bar {
  box-shadow: 0px 0 3px rgb(0 0 0 / 30%);
}
.van-address-list__bottom {
  display: none;
}
.van-address-list {
  padding: 0;
}
.van-icon-edit:before {
  content: '\e65f';
  transform: rotate(90deg);
}
.van-card {
  background-color: #fff;
}

.ali {
  color: #1989fa;
  margin-right: 0.625rem;
}
.wx {
  color: #00ac84;
  margin-right: 0.625rem;
}
</style>
