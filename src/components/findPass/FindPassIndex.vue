<template>
  <div class="index">
    <LoginHeader>
      <span>找回密码</span>
    </LoginHeader>
    <section>
      <div>
        <van-form validate-first @failed="onFailed" class="form">
          <!-- 通过 validator 进行异步函数校验 -->
          <van-field
            v-model="phone"
            name="phone"
            placeholder="请输入手机号"
            type="tel"
            maxlength="11"
            :error="false"
            :rules="[{ validator, message: '请输入正确的手机号' }]"
          />
          <van-field v-model="nodeCode" center placeholder="请输入短信验证码">
            <template #button>
              <van-button
                size="large"
                native-type="button"
                :disabled="disabled"
                @click="getCode"
                >{{ codeMsg }}</van-button
              >
            </template>
          </van-field>
          <div class="submit">
            <van-button block @click="next">下一步</van-button>
          </div>
        </van-form>
      </div>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import LoginHeader from "@/components/login/LoginHeader.vue";
import Tabbar from "@/components/Tabbar.vue";
import api from "@/api/index";

export default {
  components: {
    LoginHeader,
    Tabbar,
  },
  data() {
    return {
      phone: "",
      code: "1",
      nodeCode: "",
      codeMsg: "获取短信验证码",
      disabled: false,
      codeNum: 10,
    };
  },
  methods: {
    next() {
      //   console.log(this.code+ '--------------- '+this.nodeCode);
      //如果验证码不正确
      if (this.code != this.nodeCode) {
        return this.$toast.fail("请输入正确的验证码");
      }
      //请求后端看看有没有这个手机号
      api
        .axios({
          url: "/api/selectUser",
          method: "POST",
          params: {
            phone: this.phone,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push({
              path: "/findPassTwo",
              query: {
                phone: this.phone,
              },
            });
          } else {
            this.$toast.fail(res.msg);
          }
        });
    },

    //获取验证码
    getCode() {
      // console.log(11);
      // if (!this.validator()) return; // 此处有问题 目前不知道如何修改
      api
        .axios({
          url: "/api/getCode",
          method: "POST",
          params: {
            phone: this.phone,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            // this.nodeCode = res.data;
            this.code = res.data;
          }
        });

      this.disabled = true;
      // console.log(11);
      //倒计时可重新获取验证码
      let timer = setInterval(() => {
        --this.codeNum, (this.codeMsg = ` ${this.codeNum} 秒可重新获取`);
      }, 1000);
      //如果倒计时完了重新赋值和可点击
      setTimeout(() => {
        clearInterval(timer);
        this.codeMsg = "获取短信验证码";
        this.codeNum = 10;
        this.disabled = false;
      }, this.codeNum * 1000);
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /^1[3456789]\d{9}$/.test(val);
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
.form {
  background-color: #f5f5f5;
}
:deep(.van-field__control) {
  padding: 0 1rem;
  border: 0.0625rem solid #f5f5f5;
  line-height: 2.75rem;
}
:deep(.van-button--large) {
  padding: 0 1rem;
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
