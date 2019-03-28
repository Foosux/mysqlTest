// 简单的Mysql连接实例
var mysql = require('mysql')

// 本地数据库
var db_config = {
  host     : '127.0.0.1',
  user     : 'root',
  password : 'xiaocaomei',
  port: '3306',
  database: 'TB_Fit'
}

// 通用的查询方法
function query(sqlStr, fn) {
  var connection = mysql.createConnection(db_config)

  connection.connect()

  connection.query(sqlStr, fn)

  connection.end()
}

// 断线重连
function handleDisconnect() {
  connection = mysql.createConnection(db_config)
  connection.connect(function(err) {
    if(err) {
      console.log("进行断线重连：" + new Date())
      setTimeout(handleDisconnect, 2000)   //2秒重连一次
      return
    }
     console.log("连接成功")
  })
  connection.on('error', function(err) {
    console.log('db error', err)
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect()
    } else {
      throw err
    }
  })
}
handleDisconnect()

module.exports = { query }
