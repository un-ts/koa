import { Controller, Method, RequestMapping } from '@rxts/koa-router-decorators'
import { Context } from 'koa'

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
