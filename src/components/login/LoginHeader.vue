<template>
  <div class="login-header">
    <div @click="goback"><i class="iconfont icon-zuojiantou"></i></div>
    <div>
      <slot> <span></span> </slot>
    </div>
    <div @click="gohome"><i class="iconfont icon-shouye"></i></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.back();
    },
    gohome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang='less' scoped>
.login-header {
  display: flex;
  justify-content: space-between;
  line-height: 2.75rem;
  background-color: #b0352f;
  padding: 0 0.5rem;
  color: #fff;
  i {
    font-size: 1.3rem;
  }
}
</style>
