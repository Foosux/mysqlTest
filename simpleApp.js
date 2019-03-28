/**
 * 一个最简单的示例（连接mysql制作 api 接口）
 */
var fs = require('fs')
var Koa = require('koa')
var app = new Koa()
// koa路由
const router = require('koa-router')()
// 解析 post请求的body
const bodyParser = require('koa-bodyparser');
// 简单连接mysql
var db = require('./db')

// 制作一个简单的 用户信息 接口
router.get('/api/user/:age', (ctx, next) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM node_user WHERE age=${ctx.params.age}`, (err, results) => {
      console.log(results)
      ctx.body = results
      resolve(next())
    })
  })
})

// 制作一个 post 接口
router.get('/', (ctx, next) => {
  ctx.body = `
    <form action="/api/userAge" method="post">
      <p>年龄: <input type="text" placehold="56" name="age" /></p>
      <input type="submit" value="Submit" />
    </form>
  `
})
router.post('/api/userAge', (ctx, next) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM node_user WHERE age=${ctx.request.body.age}`, (err, results) => {
      ctx.body = results
      resolve(next())
    })
  })
})

// post参数需要额外使用 koa-bodyparser 解析
app.use(bodyParser())

app.use(router.routes())
app.listen(3000)
