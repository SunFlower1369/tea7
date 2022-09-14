<template>
  <div class="search">
    <div class="search-header">
      <van-sticky :offset-top="0">
        <form action="/">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            background="#b0352f"
            shape="round"
          >
            <template #action>
              <div @click="onSearch(value)" class="color">搜索</div>
            </template>
            <template #left>
              <div @click="back" class="left-icon color">
                <van-icon name="arrow-left" />
              </div>
            </template>
          </van-search>
        </form>
      </van-sticky>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: this.$route.query.key || "",
      searchArr: [],
    };
  },
  methods: {
    onSearch(value) {
      //后期会请求链接 带参
      // this.$router.push("/search/search-list" );
      if (!value.trim()) return;
      //判断之前没有本地存储
      if (!localStorage.getItem("searchList")) {
        //没有就设置一个空数组
        localStorage.setItem("searchList", "[]");
      } else {
        //如果之前有
        this.searchArr = JSON.parse(localStorage.getItem("searchList"));
        // console.log(this.searchArr);
      }
      //添加数据和去重    本地存储中没有  下一步 把数据添加到本地  new Set后会让数据变成对象
      //  下面不行
      // let newArr = new Set(this.searchArr.unshift(this.value));
      //添加数据
      this.searchArr.unshift(value);
      //去重
      let newArr = new Set(this.searchArr);
      //添加到本地存储   Array.from(newArr)这里是把数据转为数组
      localStorage.setItem("searchList", JSON.stringify(Array.from(newArr)));

      //如果搜索的内容一致会报错 因此进行判断 传过来的值是否和之前相同  如果是就直接return
      if (this.value === this.$route.query.key) return;

      //尝试过使用params  可是没有实现
      this.$router.push({
        path: "/search/search-list",
        query: {
          key: value,
        },
      });
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang='less' scoped>
.search {
  .search-header {
    .left-icon {
      margin: 0 1rem 0 0;
    }
  }
}

.color {
  color: white;
  font-size: 1.2rem;
}
</style>
