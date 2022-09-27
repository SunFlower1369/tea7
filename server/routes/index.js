var express = require('express');
var router = express.Router();
//导入数据库
const sqlFun = require('../mysql');
var QcloudSms = require("qcloudsms_js");
var jwt = require("jsonwebtoken")

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

//密码登录的接口
router.post('/login', (req, res) => {
    const username = req.query.phone;
    const password = req.query.password;
    // let [username, password] = Object.values(req.query)
    // console.log(username, password);
    //创建sql语句
    const sql = 'select * from user where user_name=? and password=?';
    //arr参数
    const arr = [username, password];
    //用户信息
    let payload = { user_name: username }
        //口令
    let secret = 'huangweizaitest'
        //生成token
    let token = jwt.sign(payload, secret, {
            expiresIn: 60
        })
        //调用数据库查询方法
    sqlFun(sql, arr, (result) => {
        if (result.length > 0) {
            //查询到就记录他的id
            let id = result[0].id
                // console.log(id);
            let sqlToken = 'update user set token = "' + token + '" where id = ' + id + ' '
            sqlFun(sqlToken, null, (r) => {
                // console.log('update user set token = "' + token + '" where id = ' + id + ' ');
                // console.log('这里的长度是：' + r.length);
                let sqlSelect = 'select * from user where id = ' + id + ''
                sqlFun(sqlSelect, null, result => {
                    if (result.length > 0) {
                        res.send({
                            status: 200,
                            msg: '登录成功',
                            data: result[0]
                        });
                    }
                })

            })

        } else {
            //没查询到，表示登录失败
            res.send({
                status: 400,
                msg: '用户名密码错误',
            });
        }
    });
});

//短信登录的接口
router.post('/getCode', (req, res) => {
    let phone = req.query.phone;
    // console.log(phone);
    //短信应用SDK AppID
    var appid = 1400740909; // SDK AppID是1400开头

    // 短信应用SDK AppKey
    var appkey = "71aaad4a79385932c89c9fa7cc3c6fa3";

    // 需要发送短信的手机号码
    var phoneNumbers = [phone];

    // 短信模板ID，需要在短信应用中申请
    var templateId = 1550370; // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

    // 签名
    var smsSign = "个人实践开发个人网"; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

    // 实例化QcloudSms
    var qcloudsms = QcloudSms(appid, appkey);

    // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    function callback(err, coderes, resData) {
        if (err) {
            console.log("err: ", err);
        } else {
            res.send({
                    status: 200,
                    data: coderes.req.body.params[0],
                    msg: '登录成功'
                })
                // console.log("request data: ", coderes.req);
                // console.log("response data: ", resData);
        }
    }
    var ssender = qcloudsms.SmsSingleSender();
    //这里的params 是发送的验证码  这里生成4位随机数
    var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000];
    ssender.sendWithParam(86, phoneNumbers[0], templateId,
        params, smsSign, "", "", callback); // 签名参数不能为空串

})

//如果短信验证是新用户就直接添加，注册成功，有的话返回数据
router.post('/loginOrAdd', (req, res) => {
    const phone = req.query.phone
        // console.log(phone);
        //创建sql语句
    const sql = 'select * from user where user_name=?';
    let arr = [phone]
        //调用数据库查询方法,这里先判断用户是否存在
    sqlFun(sql, arr, (result) => {
        if (result.length > 0) {
            //查询到表示用户存在
            // console.log(sql);
            res.send({
                status: 200,
                msg: '登录成功',
                data: result[0]
            });
        } else {
            //没查询到，表示用户不存在 ，直接注册插入到数据库
            const sqlAdd = 'insert into user (user_name,password,avator,nickName,token) values ("' + phone + '","123456","","1 ","1 ")'
            sqlFun(sqlAdd, arr, (result) => {
                sqlFun(sql, arr, (r) => {
                    if (r.length > 0) {
                        //插入后查询到
                        res.send({
                            status: 200,
                            msg: '登录成功',
                            data: r[0]
                        });
                    }
                })
            })
        }

    })
});

//注册
router.post('/register', (req, res) => {
    const phone = req.query.phone
    const password = req.query.password

    // 查询用户是否存在，如果存在则提示账号已存在，不存在则插入
    const sql = 'select * from user where user_name=?';
    let arr = [phone, password]
        //判断是否已存在
    sqlFun(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 201,
                msg: '账号已存在，请直接登录',
                data: result[0]
            })
        } else {
            //不存在的情况
            const sqlAdd = 'insert into user (user_name,password,avator,nickName,token) values ("' + phone + '","' + password + '","","1 ","1 ")'
            sqlFun(sqlAdd, arr, (result) => {
                sqlFun(sql, arr, r => {
                    res.send({
                        status: 200,
                        msg: '登录成功',
                        data: r[0]
                    });
                })
            })
        }
    })
})

//修改密码第一步查询
router.post('/selectUser', (req, res) => {
    let phone = req.query.phone
    const sql = 'select * from user where user_name=?'
    let arr = [phone]
    sqlFun(sql, arr, (result) => {
        if (result.length > 0) {
            // console.log('进入了已注册可修改');
            res.send({
                status: 200,
                msg: '修改',
                data: result[0]
            })
        } else {
            res.send({
                status: 500,
                msg: '该手机号暂未注册！'
            })
        }
    })
})

//更新密码
router.post('/updatePassword', (req, res) => {
    let phone = req.query.phone
    let password = req.query.password
        // console.log(req.query);
    const sql = 'select * from user where user_name= ' + phone + ''

    let arr = [phone, password]
    sqlFun(sql, arr, (result) => {
        // let password = result[0].password
        let id = result[0].id
        const sqlupdate = 'update user set password = "' + password + '" where id = ' + id + ' '
            // console.log('update user set password = ' + password + ' where id = ' + id + ' ');
        if (result.length > 0) {
            sqlFun(sqlupdate, arr, (r) => {
                res.send({
                    status: 200,
                    msg: '修改成功',
                    data: r[0]
                })
            })
        }
    })
})



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
        // console.log(id);
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
router.get('/sortList', (req, res) => {

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


//加入购物车
router.post('/addCart', (req, res) => {
    //前端传过来的token  后端解析
    let goods_id = req.query.goods_id
    let token = req.headers.token
    let user = jwt.decode(token)
        // console.log(user.user_name);
    let sql = 'select * from user where user_name = ' + user.user_name + ''
    sqlFun(sql, null, result => {
        //记录查询出来的userid
        let uId = result[0].id
        let sqlGoods = 'select * from goods_list where id = ' + goods_id + ''
        sqlFun(sqlGoods, null, (results) => {
            // console.log(results[0]);
            // 获取到商品的信息   稍后添加表
            let goods_name = results[0].title
            let goods_price = results[0].price
            let goods_imgUrl = results[0].imgUrl
                //添加表之前判断这个用户之前有没有添加过此商品
            let sqlSelect = 'select * from goods_cart where uId=' + uId + ' and goods_id = ' + goods_id + ' '
            sqlFun(sqlSelect, null, (resultSelect) => {
                // console.log(resultSelect);
                if (resultSelect.length > 0) {
                    let num = resultSelect[0].goods_num
                    let id = resultSelect[0].id
                        // console.log(resultSelect[0].goods_num);
                    let sqlUpdateNum = 'update goods_cart set goods_num  =  ' + (num + 1) + ' where id = ' + id + ''
                    console.log('update goods_cart set goods_num  =  ' + num + ' where id = ' + id + '');
                    sqlFun(sqlUpdateNum, null, (r) => {
                        res.send({
                            status: 200,
                            msg: '已增加数量'
                        })
                    })
                } else {
                    //没有添加过就添加该商品
                    // console.log(uId, goods_id, goods_name, goods_price, goods_imgUrl);
                    let arr = [uId, goods_id, goods_name, goods_price, goods_imgUrl]
                    let sqlInsert = 'insert into goods_cart (uId, goods_id, goods_name, goods_num, goods_price, goods_imgUrl) values ("' + uId + '","' + goods_id + '","' + goods_name + '","1","' + goods_price + '","' + goods_imgUrl + '")'
                    console.log('insert into goods_cart (uId, goods_id, goods_name, goods_num, goods_price, goods_imgUrl) values (' + uId + ',' + goods_id + ',"' + goods_name + '",1,' + goods_price + ',"' + goods_imgUrl + '")');
                    sqlFun(sqlInsert, null, (resultAddGoods) => {
                        res.send({
                            status: 200,
                            msg: '添加成功',
                        })
                    })
                }
            })
        })
    })
})

//获取购物车页面
router.get('/getCartList', (req, res) => {
    let token = req.headers.token
    let user = jwt.decode(token)
        // console.log(user.user_name);
    let sql = 'select * from user where user_name = ' + user.user_name + ''
    sqlFun(sql, null, (result) => {
        if (result.length > 0) {
            // console.log(result[0]);
            let sqlCart = 'select * from goods_cart where uId = ' + result[0].id + ''
            sqlFun(sqlCart, null, (results) => {
                if (results.length > 0) {
                    res.send({
                        status: 200,
                        msg: '已加载',
                        data: results
                    })
                } else {
                    res.send({
                        status: 400,
                        msg: '暂无数据'
                    })
                }
            })
        }
    })
})
module.exports = router;