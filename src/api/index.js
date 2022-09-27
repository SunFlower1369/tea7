import axios from 'axios'
import store from '@/store'
import router from '@/router'

export default {
    common: {
        method: 'GET',
        data: {},
        params: {},
        headers: {}
    },
    axios(options = {}) {
        options.method = options.method || this.common.method
        options.data = options.data || this.common.data
        options.params = options.params || this.common.params
        options.headers = options.headers || this.common.headers

        // console.log(store.state.loginInfo.token);
        // console.log(options);

        if (options.headers.token) {
            options.headers.token = store.state.loginInfo.token
            if (!options.headers.token) {
                router.push('/login')
            }
        }

        return axios(options).then(res => {
            let data = res.data
                // console.log(res);
            return new Promise((res, rej) => {
                //如果没有数据则返回rej
                if (!res) return rej
                    //如果有就返回res（data）
                res(data)
            })
        })

    }

}