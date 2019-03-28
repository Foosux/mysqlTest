/**
 * 管理用户接口
 */

// 简单连接mysql
let db = require('../db')

class UserController {
  
  static getUser(ctx, next) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM node_user`, (err, results) => {
        if (err) throw err
        ctx.body = results
        resolve(next())
      })
    })
  }

  static getAge(ctx, next) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT age FROM node_user`, (err, results) => {
        if (err) throw err
        ctx.body = results
        resolve(next())
      })
    })
  }
}

module.exports = { UserController }
