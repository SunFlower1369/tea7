<template>
  <div>
    <!-- <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="value1" :options="option1" @change="change" />
      <van-dropdown-item v-model="value2" :options="option2" @change="change" />
      <van-dropdown-item v-model="value3" :options="option3" @change="change" />
    </van-dropdown-menu> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
        { text: "综合", value: 0 },
        { text: "默认排序", value: 1 },
      ],
      option2: [
        { text: "价格", value: 0 },
        { text: "价格升序", value: 1 },
        { text: "价格降序", value: 2 },
      ],
      option3: [
        { text: "销量", value: 0 },
        { text: "销量升序", value: 1 },
        { text: "销量降序", value: 2 },
      ],
    };
  },
  methods: {
    change(value) {
      console.log(value);
    },
  },
};
</script> 

<style lang='less' scoped>
/deep/.item::after {
  border: none;
}
</style>
