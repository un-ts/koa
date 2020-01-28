import Router from '@koa/router'
import { injectAllRoutes } from '@rxts/koa-router-decorators'
import consola from 'consola'
import Koa, { DefaultContext, DefaultState } from 'koa'
import compose from 'koa-compose'
import session from 'koa-session'

import './common.controller'
import './methods.controller'
import './user.controller'
// tslint:disable-next-line: ordered-imports
import './fallback.controller'

const app = new Koa()

const router = new Router<DefaultState, DefaultContext>()

injectAllRoutes(router)

app.keys = ['secret']

app.use(compose([session(app), router.routes(), router.allowedMethods()]))

const DEFAULT_HOST = 'localhost'
const DEFAULT_PORT = 3000

const host = process.env.HOST || DEFAULT_HOST
const port = Number(process.env.PORT) || DEFAULT_PORT

app.listen(port, host, () =>
  consola.ready('server is listening at http://%s:%s', host, port),
)
