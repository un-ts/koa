import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

import * as _debug from 'debug'

import userController from './user-controller'

const debug = _debug('1stg:server')

const app = new Koa()

const router = new KoaRouter()

userController(router)

app.use(router.routes())
app.use(router.allowedMethods())

const host = 'localhost'
const port = 3000

app.listen(port, host, () => debug('server is listening at %s:%s', host, port))
