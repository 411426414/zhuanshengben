const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { koaSwagger } = require('koa2-swagger-ui')


// swagger配置
const swagger = require('./util');
app.use(swagger.routes(), swagger.allowedMethods())
app.use(
    koaSwagger({
      routePrefix: '/swagger', // 主机设置为/swagger，而不是default /docs
      swaggerOptions: {
        url: '/swagger.json' // json的示例路径
      }
    })
);

// error handler
onerror(app)

// bodyParser解析请求体
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 路由配置
const index = require('./routes/index')
const users = require('./routes/users')

// 使用路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
