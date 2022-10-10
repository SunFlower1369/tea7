const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
})

module.exports = {
    lintOnSave: true, // 严格模式开启（默认true）或者关闭（false）
}

//修改配置文件一定要重启项目
module.exports = {
    //配置跨域问题
    devServer: {
        proxy: {
            '/api': {
                //因为这里写了api所以后期请求地址前需要添加/api
                target: 'http://localhost:3000',
                changeOrigin: true,
                //路径重写
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
};