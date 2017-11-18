import { Controller, Method, RequestMapping } from '../lib'

@Controller
@RequestMapping({
  method: Method.POST,
  path: '/user'
})
export class UserController {
  @RequestMapping({
    method: Method.GET
  })
  public helloUser(ctx) {
    ctx.body = 'Hello User!'
  }

  @RequestMapping('/test')
  public test(ctx) {
    ctx.body = 'Test'
  }
}
