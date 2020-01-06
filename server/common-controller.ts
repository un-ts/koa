import { Context } from 'koa'

import { Controller, Method, RequestMapping } from '..'

@Controller
@RequestMapping({
  method: Method.POST,
})
export class CommonController {
  @RequestMapping('/', Method.GET)
  helloWorld(ctx: Context) {
    ctx.body = 'Hello World'
  }

  @RequestMapping({
    method: Method.GET,
    path: /^\/\d{3}$/,
  })
  testRegExp(ctx: Context) {
    ctx.body = ctx.url
  }
}
