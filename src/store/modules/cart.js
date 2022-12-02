import { Toast, Dialog } from 'vant';
import api from '@/api/index'

export default {
    state: {
        cartList: [], //这里是购物车的数据
        selectList: [] //这里是选中的数据 
    },
    getters: {
        isCheckAll(state) {
            // console.log(state.cartList);
            return state.cartList.length == state.selectList.length
        },
        totalPrice(state) {
            let totalPrice = {
                totalPrice: 0,
                num: 0
            };
            // console.log(state.cartList);
            state.cartList.forEach(v => {
                if (v.checked == true) {
                    totalPrice.totalPrice += (v.goods_num * v.goods_price) * 100;
                    totalPrice.num += v.goods_num
                        // console.log(typeof(totalPrice));
                }
            })
            return totalPrice
        }
    },
    mutations: {
        cartList(state, listArr) {
            state.cartList = listArr;
            // console.log(listArr);
            // console.log(state.cartList);
            state.selectList = state.cartList.map(v => {
                return v.id;
            })
        },
        //全选
        checkAll(state) {
            state.selectList = state.cartList.map(v => {
                v.checked = true
                return v.id
            })
        },
        //全不选
        unCheckAll(state) {
            state.cartList.forEach(v => {
                v.checked = false
            })
            state.selectList = []
        },
        //单选取消一个或者全部选中联动
        checkOne(state, index) {
            // console.log(index);
            //接收到索引值查询到所对应的id  因为上面  selectList  中保存的是id值
            let id = state.cartList[index].id;
            //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
            let i = state.selectList.indexOf(id);
            //大于0 代表有 就删除
            if (i > -1) {
                return state.selectList.splice(i, 1)
            } else {
                //否则就是没有 就添加 
                state.selectList.push(id)
            }
        },
        deleteGoodsSome(state) {
            state.cartList = state.cartList.filter(v => {
                return state.selectList.indexOf(v.id) == -1
            })
        }
    },
    actions: {
        checkAllFun({ commit, getters }) {
            getters.isCheckAll ? commit('unCheckAll') : commit('checkAll');
            // console.log('点击没有');
        },
        deleteGoods({ commit, state }, id) {
            //如果没有选中，提示
            if (state.selectList.length == 0) {
                Toast.fail('未选择商品');
            } else {
                let cartDeleteArr = []
                Dialog.confirm({
                    message: '确定要删除商品吗?',
                }).then(() => {
                    if (typeof id == 'number') {
                        //单个删除
                        cartDeleteArr = [id];
                        let index = state.cartList.findIndex(v => {
                                return v.id == id
                            })
                            // console.log(cartDeleteArr);
                        state.cartList.splice(index, 1);
                        //会出现删除单个的时候全选按钮取消了  所以调用了不全选方法
                        // state.selectList.splice(index, 1);
                        commit('unCheckAll')
                    } else {
                        //多选删除
                        cartDeleteArr = state.selectList;
                        commit('deleteGoodsSome');
                    }
                    api.axios({
                            url: '/api/deleteGoods',
                            params: {
                                cartDeleteArr
                            },
                        })
                        .then((res) => {
                            if (res.status == 200) {
                                Toast.success(res.msg);
                            }
                        })
                }).catch(() => {
                    // on cancel

                });;
            }
        },
        //有一个问题就是增加数量后不更新价格
        updateCount({ commit, state, getters }, info) {
            //console.log(info.$event, info.item.id);
            api.axios({
                    url: '/api/updateCount',
                    headers: {
                        token: true,
                    },
                    params: {
                        goods_num: info.$event,
                        id: info.item.id
                    },
                })
                .then((res) => {
                    // getters.totalPrice()
                    console.log(res);
                });
        }
    },
}