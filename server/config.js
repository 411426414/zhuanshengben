// 默认dev配置
const config = {
    DEBUG: false,// 是否调试
    // MYSQL数据库连接配置
    MYSQL:{
        host: 'localhost',
        database: 'zsb.e21.cn',
        username:'root',
        password: ''
    },
    host: 'localhost',
    port: 4000
}
if (process.env.NODE_ENV === 'production'){
    // 生产环境MySQL数据库配置
    config.MYSQL = {
        host: 'aaa.mysql.rds.aliyuncs.com',
        database: 'aaa',
        username: 'aaa',
        password: 'aaa'
    }
}
module.exports = config
