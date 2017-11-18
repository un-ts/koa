import { Controller, Method, RequestMapping } from '../lib'

@Controller
@RequestMapping({
  method: Method.POST
})
export class CommonController {
  @RequestMapping({
    method: Method.GET,
    path: '/'
  })
  public helloWorld(ctx) {
    ctx.body = 'Hello World'
  }

  @RequestMapping({
    method: Method.GET,
    path: /^\/\d{3}$/
  })
  public testRegExp(ctx) {
    ctx.body = ctx.url
  }
}
