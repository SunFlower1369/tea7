<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star-o" text="已收藏" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import api from '@/api/index';
export default {
  data() {
    return {};
  },
  methods: {
    async addCart() {
      // console.log(this.$route.query.id);
      await api
        .axios({
          url: '/api/addCart',
          method: 'POST',
          params: {
            goods_id: this.$route.query.id,
          },
          headers: {
            //用true 表示已登录已验证  false相反
            token: true,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.$toast.success(res.msg);
          } else {
            this.$toast.fail('添加失败');
          }
        });
    },
  },
};
</script>

<style lang="less" scoped></style>
