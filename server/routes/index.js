var express = require('express');
var router = express.Router();
//导入数据库
const sqlFun = require('../mysql');

/* GET home page. */
router.get('/', function (req, res, next) {
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

router.get('/index_list', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send({
    code: 200,
    data: {
      tabsList: [
        "推荐",
        "大红袍",
        "金骏眉",
        "铁观音",
        "绿茶",
        "紫砂壶",
        "普洱",
      ],
      swiperList: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
      iconsList: [
        {
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
      ],
      hotList: [
        {
          id: 1,
          title: "龙井",
          content: "真是一个好茶啊",
          price: 222,
          imgUrl:
            "https://img.tea7.com/0123034_0.jpeg?x-oss-process=image/resize,w_720",
        },
        {
          id: 2,
          title: "龙井",
          content: "真是一个好茶啊",
          price: 222,
          imgUrl:
            "https://img.tea7.com/0123034_0.jpeg?x-oss-process=image/resize,w_720",
        },
        {
          id: 3,
          title: "龙井",
          content: "真是一个好茶啊",
          price: 222,
          imgUrl:
            "https://img.tea7.com/0123034_0.jpeg?x-oss-process=image/resize,w_720",
        },
        {
          id: 4,
          title: "龙井",
          content: "真是一个好茶啊",
          price: 222,
          imgUrl:
            "https://img.tea7.com/0123034_0.jpeg?x-oss-process=image/resize,w_720",
        },
      ],
      likeList: [
        {
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
    }
  })
});



module.exports = router;
