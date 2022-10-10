export default {
    state: {
        cartList: [], //这里是购物车的数据
        selectList: [] //这里是选中的数据 
    },
    getters: {
        isCheckAll(state) {
            // console.log(state.cartList);
            console.log(1);
            return state.cartList.length == state.selectList.length
        },
        totalPrice(state) {
            let totalPrice = 0;
            // console.log(state.cartList);
            console.log(2);
            state.cartList.forEach(v => {
                if (v.checked == true) {
                    totalPrice += (v.goods_num * v.goods_price) * 100;
                    // console.log(typeof(totalPrice));
                }
            })
            return totalPrice
        }
    },
    mutations: {
        cartList(state, listArr) {
            state.cartList = listArr;
            // console.log(' 这里是store');
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
        }
    },
    actions: {
        checkAllFun({ commit, getters }) {
            getters.isCheckAll ? commit('unCheckAll') : commit('checkAll');
            // console.log('点击没有');
        }
    },
}