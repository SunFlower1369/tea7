<template>
  <div class="floortitle">
    <slot> <span></span></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.floortitle {
  text-align: center;
  padding: 0.2rem 0;
  color: #333333;
}
.floortitle span {
  position: relative;
  display: inline-block;
}
.floortitle span::before {
  content: '';
  position: absolute;
  left: -1rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  display: block;
  background: #d4c0a7;
  top: 50%;
  margin-top: -4px;
}
.floortitle span::after {
  content: '';
  position: absolute;
  right: -1rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  display: block;
  background: #d4c0a7;
  top: 50%;
  margin-top: -4px;
}
</style>
