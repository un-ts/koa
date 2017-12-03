import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as KoaSession from 'koa-session'

import * as _debug from 'debug'

import { injectAllRoutes } from '../lib'

import './common-controller'
import './methods-controller'
import './user-controller'

const debug = _debug('1stg:server')

const app = new Koa()

app.keys = ['secret']

app.use(KoaSession(app))

const router = new KoaRouter()

injectAllRoutes(router)

app.use(router.routes())
app.use(router.allowedMethods())

const host = 'localhost'
const port = 3000

app.listen(port, host, () => debug('server is listening at %s:%s', host, port))