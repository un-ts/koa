import { Context } from 'koa'

import { Controller, Method, RequestMapping } from '../lib'

@Controller
@RequestMapping({
  method: Method.POST
})
export class CommonController {
  @RequestMapping('/', Method.GET)
  public helloWorld(ctx: Context) {
    ctx.body = 'Hello World'
  }

  @RequestMapping({
    method: Method.GET,
    path: /^\/\d{3}$/
  })
  public testRegExp(ctx: Context) {
    ctx.body = ctx.url
  }
}
