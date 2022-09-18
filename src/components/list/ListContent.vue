<template>
  <div class="list-left">
    <van-sticky :offset-top="50">
      <div class="left">
        <van-sidebar v-model="activeKey" @change="changeList">
          <van-sidebar-item
            :title="item.name"
            v-for="(item, index) in leftList"
            :key="index"
          />
        </van-sidebar>
      </div>
    </van-sticky> 
    <div class="list-right" ref="rightHeight">
      <div v-for="(item, index) in rightList" :key="index">
        <div class="right" v-for="(v, i) in item" :key="i">
          <h3>{{ v.name }}</h3>
          <van-grid :column-num="3">
            <van-grid-item
              v-for="(v, i) in v.list"
              :key="i"
              :icon="v.imgUrl"
              :text="v.name"
            />
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  created() {
    this.getList();
  },
  data() {
    return {
      activeKey: 0,
      leftList: [],
      rightList: [],
      rightHeight: [],
      rightScroll: "",
    };
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
            res.data.forEach((v) => {
              left.push({
                id: v.id,
                name: v.name,
              });
              right.push(v.data);
            });

            this.leftList = left;
            this.rightList = right;
            // console.log(this.leftList);
            // console.log(this.rightList);
          }

          // this.$nextTick(() => {
          //   let right = 0;
          //   this.rightHeight.push(right);
          //   //获取每个grid的高度
          //   // console.log(this.$refs.rightHeight.getElementsByClassName("right"));
          //   let allHeight =
          //     this.$refs.rightHeight.getElementsByClassName("right");
          //   //把获取到的高度转换为数组
          //   Array.from(allHeight).forEach((v) => {
          //     right += v.clientHeight;
          //     this.rightHeight.push(right);
          //   });
          //   // console.log(this.rightHeight);
          // });
        });
    },
    changeList(index) {
      // console.log(index);
      // this.setData({});
      this.activeKey = index;
      // this.rightScroll.scrollTo(0, -this.rightHeight[index], 300);
    },
  },
};
</script>

<style lang='less' scoped>
.list-left {
  display: flex;
  height: calc(100vh - 6.25rem);
  overflow: scroll;
  .left {
    height: calc(100vh - 6.25rem);
    border-right: 1px solid #eee;
  }
  .list-right {
    flex: 1;
    height: calc(100vh - 6.25rem);
    overflow: scroll;
    .right {
      text-align: center;
      margin: 1rem 0;
    }
  }
}
.van-sidebar {
  width: auto;
}
.van-sidebar-item {
  background-color: transparent;
}
:deep(.van-grid-item__content::after) {
  border-width: 0;
}
:deep([class*="van-hairline"]::after) {
  border: none;
}
</style>
