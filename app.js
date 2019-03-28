/**
 * 使用 koa+mysql 制作resful接口
 */

let fs = require('fs')
let Koa = require('koa')
let app = new Koa()
// 解析 post请求的body
const bodyParser = require('koa-bodyparser')
// 路由
const router = require('koa-router')()
let UC = require('./server/UserController')

router.get('/api/user', UC.UserController.getUser)
      .get('/api/age', UC.UserController.getAge)


app.use(bodyParser())
app.use(router.routes())
app.listen(3001)
