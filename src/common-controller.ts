import { Controller, RequestMapping } from '../lib'

@Controller
export class CommonController {
  @RequestMapping('/')
  public helloWorld(ctx) {
    ctx.body = 'Hello World'
  }
}
