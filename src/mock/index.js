//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据
Mock.mock('/api/login','post', {
    "status":0,
    "msg":
      {
        "name": 'admin',
        "id|10": 10,//随机生成1-800的数字
        "nickname": "@cname",//随机生成中文名字
      }
});