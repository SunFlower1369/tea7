export default {
    state: {
        loginStatus: false,
        token: '',
        userInfo: {}
    },
    getters: {},
    mutations: {
        loginInfo(state, user) {
            // console.log(user);
            state.loginStatus = true
            state.token = user.token
            state.userInfo = user
                //持久化存储就是储存到本地
            localStorage.setItem('userInfo', JSON.stringify(user))
        },
        //这里是初始化  就是登录刷新也保持状态
        initUser(state) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (userInfo) {
                state.loginStatus = true
                state.token = userInfo.token
                state.userInfo = userInfo
            }
        },
        //退出登录
        logout(state) {
            state.loginStatus = false
            state.token = null
            state.userInfo = {}
            localStorage.removeItem('userInfo')
        }

    },
    actions: {},
}