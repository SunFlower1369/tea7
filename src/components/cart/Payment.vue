<template>
  <div>
    <van-radio-group v-model="radioPayment">
      <van-cell-group>
        <van-cell clickable @click="radioPayment = 'ali'">
          <template #right-icon>
            <van-radio name="ali" />
          </template>
          <template #default>
            <i class="iconfont icon-zhifubao ali" />支付宝
          </template>
        </van-cell>
        <!-- <van-cell clickable @click="radioPayment = 'wx'">
          <template #right-icon>
            <van-radio name="wx" />
          </template>
          <template #default>
            <i class="iconfont icon-weixin wx" />微信
          </template>
        </van-cell> -->
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  props: ['payment'],
  data() {
    return {
      radioPayment: this.payment,
    };
  },
};
</script>

<style lang="less" scoped>
.ali {
  color: #1989fa;
  margin-right: 0.625rem;
}
.wx {
  color: #00ac84;
  margin-right: 0.625rem;
}
</style>
