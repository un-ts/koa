import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaSession from 'koa-session'
import consola from 'consola'

import { injectAllRoutes } from '..'

import './common-controller'
import './methods-controller'
import './user-controller'

const app = new Koa()

app.keys = ['secret']

app.use(KoaSession(app))

const router = new KoaRouter()

injectAllRoutes(router)

app.use(router.routes())
app.use(router.allowedMethods())

const DEFAULT_HOST = 'localhost'
const DEFAULT_PORT = 3000

const host = process.env.HOST || DEFAULT_HOST
const port = Number(process.env.PORT) || DEFAULT_PORT

app.listen(port, host, () =>
  consola.ready('server is listening at http://%s:%s', host, port),
)
