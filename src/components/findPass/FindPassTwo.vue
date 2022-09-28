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
            v-model="password"
            name="password"
            placeholder="请输入密码"
            :error="false"
            :rules="[{ validator, message: '请输入6-12位密码' }]"
          />
          <div class="submit">
            <van-button block @click="changePass">确认修改</van-button>
          </div>
        </van-form>
      </div>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import LoginHeader from '@/components/login/LoginHeader.vue';
import Tabbar from '@/components/Tabbar.vue';
import api from '@/api/index';
export default {
  components: {
    LoginHeader,
    Tabbar,
  },
  data() {
    return {
      password: '',
    };
  },
  methods: {
    changePass() {
      // console.log(this.$route.query.phone);
      if (!this.validator('password')) return;
      api
        .axios({
          url: '/api/updatePassword',
          method: 'POST',
          params: {
            phone: this.$route.query.phone,
            password: this.password,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success(res.msg);
            this.$router.push('/passwordLogin');
          }
        })
        .catch((err) => {
          this.$toast(err);
        });
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /^\w{6,12}$/.test(val);
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
  },
};
</script>

<style lang="less" scoped>
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
