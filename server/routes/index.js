var express = require('express');
var router = express.Router();
//导入数据库
const sqlFun = require('../mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//测试完成已连接数据库
router.get('/index_list/data', (req, res) => {
    const sql = 'select * from home'
    sqlFun(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            });
        } else {
            res.send({
                status: 400,
                msg: '暂无数据',
            });
        }
    });
});

//首页
router.get('/index_list/0', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.send({
        code: 200,
        data: {
            tabsList: [
                { name: 1, title: '推荐' },
                { name: 2, title: '大红袍' },
                { name: 3, title: '铁观音' },
                { name: 4, title: '绿茶' },
                { name: 5, title: '紫砂壶' },
                { name: 6, title: '普洱' },
                { name: 7, title: '茶具' },
                { name: 8, title: '茶具' }
            ],
            data: [{
                    id: 0,
                    type: 'swiperList',
                    data: [
                        "https://img01.yzcdn.cn/vant/apple-1.jpg",
                        "https://img01.yzcdn.cn/vant/apple-2.jpg",
                    ]
                },
                {
                    id: 1,
                    type: 'iconsList',
                    data: [{
                            id: 1,
                            icon: "iconfont icon-cha",
                            name: "自饮茶",
                        },
                        {
                            id: 2,
                            icon: "iconfont icon-lihe",
                            name: "品牌茶",
                        },
                        {
                            id: 3,
                            icon: "iconfont icon-chaju",
                            name: "茶具",
                        },
                        {
                            id: 4,
                            icon: "iconfont icon-fulizhongxin",
                            name: "领福利",
                        },
                        {
                            id: 5,
                            icon: "iconfont icon-icon-auth",
                            name: "官方验证",
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'hotList',
                    data: [{
                            id: 1,
                            title: "龙井",
                            content: "真是一个好茶啊",
                            price: 222,
                            imgUrl: "https://img.tea7.com/0123034_0.jpeg?x-oss-process=image/resize,w_720",
                        },
                        {
                            id: 2,
                            title: "龙井",
                            content: "真是一个好茶啊",
                            price: 222,
                            imgUrl: "https://img.tea7.com/0123034_0.jpeg?x-oss-process=image/resize,w_720",
                        },
                        {
                            id: 3,
                            title: "龙井",
                            content: "真是一个好茶啊",
                            price: 222,
                            imgUrl: "https://img.tea7.com/0123034_0.jpeg?x-oss-process=image/resize,w_720",
                        },
                        {
                            id: 4,
                            title: "龙井",
                            content: "真是一个好茶啊",
                            price: 222,
                            imgUrl: "https://img.tea7.com/0123034_0.jpeg?x-oss-process=image/resize,w_720",
                        },
                    ]
                },
                {
                    id: 3,
                    type: 'likeList',
                    data: [{
                            id: 1,
                            imgUrl: 'https://img.tea7.com/0170763_0.png?x-oss-process=image/resize,w_300',
                            title: "黄山太平猴魁绿茶1号",
                            price: 203,
                        },
                        {
                            id: 2,
                            imgUrl: 'https://img.tea7.com/0173689_0.png?x-oss-process=image/resize,w_300',
                            title: "绿茶-竹影清风碧螺春",
                            price: 203,
                        },
                        {
                            id: 3,
                            imgUrl: 'https://img.tea7.com/0173605_0.png?x-oss-process=image/resize,w_300',
                            title: "绿茶-大境枝美白茶",
                            price: 203,
                        },
                    ]
                },

            ]
        }
    })
});

// 大红袍页
router.get('/index_list/1', function(req, res, next) {
    res.send({
        code: 200,
        data: [{
                id: 3,
                type: 'advertList',
                data: [
                    { imgUrl: 'https://imgcon.tea7.com/6363865086046441694910085.jpg' },
                    { imgUrl: 'https://imgcon.tea7.com/6363865086046441694910085.jpg' },
                    { imgUrl: 'https://imgcon.tea7.com/6363865086046441694910085.jpg' }
                ]
            },
            {
                id: 4,
                type: 'likeList',
                data: [{
                        id: 1,
                        imgUrl: 'https://img.tea7.com/0100658_0.jpeg?x-oss-process=image/resize,w_500',
                        title: "雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号",
                        price: 203,
                    },
                    {
                        id: 2,
                        imgUrl: 'https://img.tea7.com/0100658_0.jpeg?x-oss-process=image/resize,w_500',
                        title: "雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号",
                        price: 203,
                    },
                    {
                        id: 3,
                        imgUrl: 'https://img.tea7.com/0100658_0.jpeg?x-oss-process=image/resize,w_500',
                        title: "雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号",
                        price: 203,
                    },
                ]
            },
        ]
    })
});

//搜索页面
router.get('/search', (req, res) => {
    res.send({
        code: 200,
        data: [{
            id: 3,
            type: 'likeList',
            data: [{
                    id: 1,
                    imgUrl: 'https://img.tea7.com/0100658_0.jpeg?x-oss-process=image/resize,w_500',
                    title: "雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号",
                    price: 203,
                },
                {
                    id: 2,
                    imgUrl: 'https://img.tea7.com/0100658_0.jpeg?x-oss-process=image/resize,w_500',
                    title: "雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号",
                    price: 203,
                },
                {
                    id: 3,
                    imgUrl: 'https://img.tea7.com/0100658_0.jpeg?x-oss-process=image/resize,w_500',
                    title: "雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号雨前珍稀白茶1号",
                    price: 203,
                },
            ]
        }],
    })
})


//搜索列表
router.get('/goodsList', (req, res) => {
    // let searchName = req.query.searchName
    let [searchName, keys] = Object.keys(req.query)
    let [name, order] = Object.values(req.query)
    console.log(searchName, keys, name, order);
    const sql = 'select * from goods_list where title like "%' + name + '%" order by ' + keys + ' ' + order + ''
    sqlFun(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,
            });
        } else {
            res.send({
                status: 400,
                msg: '暂无数据',
            });
        }
        // console.log(result);
    });

})


//详情页

router.get('/getDetail', (req, res) => {
    let id = req.query.id
    console.log(id);
    const sql = 'select * from goods_list where id = ' + id + ''
    sqlFun(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,
            });
        } else {
            res.send({
                status: 400,
                msg: '暂无数据',
            });
        }
        // console.log(result);
    });

})


//分类的接口
router.get('/sortList', function(req, res, next) {

    res.send({
        status: 200,
        list: [{
                name: '推荐',
                data: [{
                        id: 0,
                        name: '龙井',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 1,
                        name: '碧螺春',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 3,
                        name: '雀舌',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 4,
                        name: '安吉白茶',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 5,
                        name: '六安瓜片',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    }
                ]
            },
            {
                name: '绿茶',
                data: [{
                        id: 0,
                        name: '龙井',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 1,
                        name: '碧螺春',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 3,
                        name: '雀舌',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 4,
                        name: '安吉白茶',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 5,
                        name: '六安瓜片',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    }
                ]
            },
            {
                name: '乌龙',
                data: [{
                        id: 0,
                        name: '龙井',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 1,
                        name: '碧螺春',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 3,
                        name: '雀舌',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 4,
                        name: '安吉白茶',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 5,
                        name: '六安瓜片',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    }
                ]
            },
            {
                name: '红茶',
                data: [{
                        id: 0,
                        name: '龙井',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 1,
                        name: '碧螺春',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 3,
                        name: '雀舌',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 4,
                        name: '安吉白茶',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 5,
                        name: '六安瓜片',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    }
                ]
            },
            {
                name: '白茶',
                data: [{
                        id: 0,
                        name: '龙井',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 1,
                        name: '碧螺春',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 3,
                        name: '雀舌',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 4,
                        name: '安吉白茶',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 5,
                        name: '六安瓜片',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    }
                ]
            },
            {
                name: '普洱',
                data: [{
                        id: 0,
                        name: '龙井',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 1,
                        name: '碧螺春',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 3,
                        name: '雀舌',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 4,
                        name: '安吉白茶',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    },
                    {
                        id: 5,
                        name: '六安瓜片',
                        imgUrl: 'https://img.tea7.com/0011478_0.jpeg?x-oss-process=image/resize,w_150'
                    }
                ]
            }
        ]
    })

})
module.exports = router;