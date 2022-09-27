<template>
  <div class="index">
    <LoginHeader>
      <span>登录</span>
    </LoginHeader>
    <section>
      <van-form validate-first @failed="onFailed">
        <!-- 通过 validator 进行异步函数校验 -->
        <van-field
          v-model="phone"
          name="phone"
          placeholder="请输入手机号"
          type="tel"
          maxlength="11"
          :error="false"
          :rules="[
            { validator: asyncValidator, message: '请输入正确的手机号' },
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          center
          clearable
          placeholder="请输入密码"
        >
        </van-field>
        <div class="submit">
          <van-button block @click="login">登录</van-button>
        </div>
      </van-form>
      <!-- 找回密码等 -->
      <div class="tab">
        <div @click="loginByPhone">
          <i class="iconfont icon-mima"></i>
          <span>短信登录</span>
        </div>
        <div @click="findPass">
          <i class="iconfont icon-shouji"></i>
          <span>找回密码</span>
        </div>
        <div @click="register">
          <i class="iconfont icon-shouji"></i>
          <span>快速注册</span>
        </div>
      </div>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import LoginHeader from "@/components/login/LoginHeader.vue";
import Tabbar from "@/components/Tabbar.vue";
import api from "@/api/index";
import { mapMutations } from "vuex";
export default {
  components: {
    LoginHeader,
    Tabbar,
  },
  computed: {},
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["loginInfo"]),
    login() {
      if (!this.asyncValidator("phone")) return;
      api
        .axios({
          url: "/api/login",
          method: "POST",
          params: {
            phone: this.phone,
            password: this.password,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            // console.log(res);
            setTimeout(() => {
              this.$toast.success(res.msg);
              //这里储存到vuex中
              this.loginInfo(res.data);
              this.$router.push("/my");
            }, 1000);
          } else {
            this.$toast.success(res.msg);
          }
        });
    },
    //注册
    register() {
      this.$router.push("/register");
    },
    loginByPhone() {
      this.$router.push("/login");
    },
    //找回密码
    findPass() {
      this.$router.push("/findPass");
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        this.$toast.loading({ message: "验证中...", duration: 800 });
        setTimeout(() => {
          //   this.$toast.clear();
          resolve(/^1[3456789]\d{9}$/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
  },
};
</script>

<style lang='less' scoped>
.index {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
section {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  padding: 2rem;
  background-color: #f5f5f5;
  .submit {
    margin: 1rem 0;
  }
}
.tab {
  display: flex;
  justify-content: space-between;
  div span {
    margin: 0 0.3125rem;
  }
}

:deep(.van-field__control) {
  padding: 0 1rem;
  border: 0.0625rem solid #f5f5f5;
  line-height: 2.75rem;
}
:deep(.van-button--large) {
  padding: 0 1.5rem;
  line-height: 2.875rem;
  background-color: #b0352f;
  color: #fff;
  border-radius: 0.25rem;
}
:deep(.van-button--normal) {
  background-color: #b0352f;
  color: #fff;
  border-radius: 0.25rem;
}
</style>
