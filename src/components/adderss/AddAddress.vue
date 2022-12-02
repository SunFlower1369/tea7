<template>
  <div>
    <div class="header">
      <div @click="goback"><i class="iconfont icon-zuojiantou"></i></div>
      <div>
        <span v-if="addressStatus">添加地址</span>
        <span v-else>编辑地址</span>
      </div>
      <div></div>
    </div>
    <van-address-edit
      v-if="addressStatus"
      :area-list="areaList"
      show-set-default
      @save="addAddress"
    />
    <van-address-edit
      v-else
      :area-list="areaList"
      :address-info="AddressInfo"
      show-delete
      show-set-default
      @save="addressUpdate"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import api from '@/api/index';
export default {
  components: {},
  data() {
    return {
      areaList,
      AddressInfo: {},
      addressStatus: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      //是通过添加进来的
      if (this.$route.params.key == 'add') {
        this.addressStatus = true;
      } else {
        //编辑进来的
        let item = JSON.parse(this.$route.query.addressInfo);
        // console.log(item);
        this.AddressInfo = item;
        this.AddressInfo.isDefault =
          this.AddressInfo.isDefault == 1 ? true : false;
      }
    },
    addAddress(content) {
      // console.log(content);
      content.isDefault = content.isDefault == true ? 1 : 0;
      api
        .axios({
          url: '/api/addAddress',
          params: {
            ...content,
          },
          headers: {
            token: true,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.$toast.success(res.msg);
            this.$router.push('/address');
          } else {
            this.$toast.fail(res.msg);
          }
        });
    },
    addressUpdate(content) {
      // this.$toast('update');
      content.isDefault = content.isDefault == true ? 1 : 0;
      api
        .axios({
          url: '/api/updateAddress',
          params: {
            ...content,
          },
          headers: {
            token: true,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.$toast.success(res.msg);
            this.$router.push('/address');
          } else {
            this.$toast.fail(res.msg);
          }
        });
    },

    onDelete(content) {
      api
        .axios({
          url: '/api/deleteAddress',
          params: {
            id: content.id,
          },
        })
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.$toast.success(res.msg);
            this.$router.push('/address');
          } else {
            this.$toast('删除失败');
          }
        });
    },
    goback() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.header {
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
