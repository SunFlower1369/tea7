//连接数据库   1已经npm i mysql   2 创建连接
const mysql = require('mysql');

//创建链接数据库
const client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'huangwei',
  //你创建mysql数据库时候的数据库名称
  database: 'tea7',
  //端口  默认3306  是的话可以省略
  //   post: "3306",
});

//数据库语句操作语句 sql语句 参数数组 arr callback 成功调回
function sqlFun(sql, arr, callback) {
  client.query(sql, arr, function (error, result) {
    //如果连接失败直接返回原因
    if (error) {
      console.log('出现什么错了');
      retrun;
    }
    callback(result);
  });
}

//导出方法
module.exports = sqlFun;
