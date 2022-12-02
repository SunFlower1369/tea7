import router from './index';

// 获取token数据
import store from '../store/index';
//路由元信息   拦截掉没有登录的
router.beforeEach((to, form, next) => {
    // console.log(to);
    if (to.matched.some((ele) => ele.meta.isLogin)) {
        //判断用户是否登录
        let token = store.state.Login.userInfo.token;
        // console.log(token);
        if (token) {
            next();
        } else {
            console.log('您还没有登录哟');
            next('/login');
        }
    } else {
        // console.log('..................');
        next();
    }
});