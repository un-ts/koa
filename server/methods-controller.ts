import { Context } from 'koa'

import { Controller, Method, RequestMapping } from '..'

@Controller
export class MethodsController {
  @RequestMapping({
    method: [Method.GET, Method.POST],
    path: '/methods',
  })
  methods(ctx: Context) {
    ctx.body = 'methods'
  }
}
