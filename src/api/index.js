import axios from 'axios'

export default {
    common: {
        method: 'GET',
        data: {},
        params: {}
    },
    axios(options = {}) {
        options.method = options.method || this.common.method
        options.data = options.data || this.common.data
        options.params = options.params || this.common.params

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