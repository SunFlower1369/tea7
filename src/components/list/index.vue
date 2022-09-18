<template>
  <div class="list">
    <van-tabs v-model="active" scrollspy>
      <van-tab
        v-for="(item, index) in leftList"
        :title="item.name"
        :key="index"
      >
        <h3>{{ item.name }}</h3>
        <van-grid :column-num="3">
          <van-grid-item
            v-for="(v, i) in rightList[index]"
            :key="i"
            :icon="v.imgUrl"
            :text="v.name"
          />
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      active: 0,
      leftList: [],
      rightList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      await api
        .axios({
          url: "/api/sortList",
        })
        .then((res) => {
          if (res.status === 200) {
            let left = [];
            let right = [];
            res.list.forEach((v) => {
              left.push({
                name: v.name,
              });
              right.push(v.data);
            });
            this.leftList = left;
            this.rightList = right;
            // console.log(res.list);
          }
          console.log(this.rightList);
        });
    },
    changeList(index) {
      this.activeKey = index;
    },
  },
};
</script>

<style lang='less' scoped>
.list {
  text-align: center;
  height: calc(100% - 100px);
  :deep(.van-tabs) {
    display: flex;
    justify-content: space-between;
    // height: calc(100% - 100px);
  }

  /* 左侧导航栏 */
  :deep(.van-tabs__nav) {
    position: relative;
    display: block;
    // background-color: #eeeeee;
    -webkit-user-select: none;
    user-select: none;
    // border: 1px solid #ccc;
  }

  :deep(.van-tabs__wrap--scrollable .van-tabs__nav) {
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  :deep(.van-tabs__nav--line.van-tabs__nav--complete) {
    padding-right: 0px;
    padding-left: 0px;
    position: fixed;
    left: 0;
    height: calc(100% - 6.25rem);
  }

  :deep(.van-tabs__nav--line.van-tabs__nav--complete) {
    padding-right: 0px;
    padding-left: 0px;
  }

  :deep(.van-tabs__wrap) {
    height: 100%;
    width: auto;
    overflow-y: auto;
  }

  :deep(.van-tabs__line) {
    display: none;
  }

  :deep(.van-tab) {
    position: relative;
    height: 50px;
    width: auto;
  }

  :deep(.van-tab--active) {
    color: red;
    background-color: white;
  }

  :deep(.van-tab--active::before) {
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: #ee0a24;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    content: "";
  }

  /* 右侧导航栏 */
  :deep(.van-tabs__content) {
    background-color: white;
    width: calc(100% - 50px);
    overflow-y: auto;
  }
}
</style>
