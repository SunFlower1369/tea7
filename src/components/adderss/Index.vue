<template>
  <div class="adderss">
    <van-sticky :offset-top="0">
      <div class="login-header">
        <div @click="goback"><i class="iconfont icon-zuojiantou"></i></div>
        <div>地址管理</div>
        <div @click="gohome"><i class="iconfont icon-shouye"></i></div>
      </div>
    </van-sticky>
    <div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        :switchable="false"
        @add="onAdd('add')"
        @edit="onEdit"
      >
        <div v-if="list.length < 1">
          <van-empty description="暂无地址" />
        </div>
      </van-address-list>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Header from '@/components/login/LoginHeader.vue';
import Tabbar from '@/components/Tabbar.vue';
import api from '@/api/index';
import { mapState, mapMutations } from 'vuex';
export default {
  components: {
    Header,
    Tabbar,
  },
  data() {
    return {
      chosenAddressId: '',
    };
  },
  created() {
    this.getAddressIndex();
  },
  computed: {
    ...mapState({
      list: (state) => state.address.list,
    }),
  },
  methods: {
    ...mapMutations(['getAddress']),
    onAdd(option) {
      this.$toast('新增地址');
      this.$router.push({
        name: 'AddAddress',
        params: {
          key: option,
        },
      });
    },
    onEdit(item, index) {
      this.$toast('编辑');
      this.$router.push({
        path: '/addAddress',
        query: {
          addressInfo: JSON.stringify(item),
        },
      });
    },
    //点进地址管理获取地址
    async getAddressIndex() {
      await api
        .axios({
          url: '/api/getAddress',
          headers: {
            token: true,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            let list = [];
            res.data.forEach((v) => {
              let address =
                v.province + v.city + v.county + ' ' + v.addressDetail;
              list.push(Object.assign({}, v, { address: address }));
            });
            // console.log(list);
            this.getAddress(list);
          } else {
            this.$toast(res.msg);
          }
        });
    },
    goback() {
      this.$router.push('/my');
    },
    gohome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="less" scoped>
.van-address-list__bottom {
  bottom: 3.0625rem;
}
.van-address-list__add {
  height: 41px;
}
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
