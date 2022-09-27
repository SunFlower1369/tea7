<template>
  <div class="my">
    <div class="header">
      <van-button type="primary" size="small" @click="login" v-if="!loginStatus"
        >登录/注册</van-button
      >

      <div class="userInfo" v-else>
        <img :src="userInfo.avatar" />
        <span>{{ userInfo.nickName }}</span>
      </div>
    </div>

    <section>
      <p class="center">个人中心</p>
      <van-cell-group>
        <van-cell title="地址管理" is-link icon="shop-o" />
        <van-cell title="其他设置" is-link icon="shop-o" />
        <van-cell
          title="退出登录"
          is-link
          icon="shop-o"
          v-if="loginStatus"
          @click="logout"
        />
      </van-cell-group>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import LoginHeader from "@/components/login/LoginHeader.vue";
import Tabbar from "@/components/Tabbar.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    LoginHeader,
    Tabbar,
  },
  computed: {
    ...mapState({
      //这里的state.loginInfo.userInfo,    state下面的  挂载的loginInfo下面的userInfo
      userInfo: (state) => state.loginInfo.userInfo,
      loginStatus: (state) => state.loginInfo.loginStatus,
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["logout"]),
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
<style lang='less' scoped>
.my {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    // display: flex;
    // height: 10rem;
    // justify-content: center;
    // align-items: center;
    text-align: center;
    line-height: 10rem;
    background-color: #b0352f;
    .userInfo {
      display: flex;
      // flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        margin: 0 2rem;
      }
      span {
        font-size: 1.3rem;
        color: #fff;
      }
    }
    .van-button {
      border-radius: 0.375rem;
      background-color: #ffb500;
    }
    .van-button--primary {
      border: none;
    }
  }
  section {
    flex: 1;
    overflow: hidden;
    .center {
      margin: 0.5rem 1rem;
    }
  }
}
.van-cell-group {
}
</style>

