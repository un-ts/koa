import { Controller, RequestMapping } from '../lib'

export default router => {
  @Controller(router)
  class Router {
    @RequestMapping('/')
    public helloWorld(ctx) {
      ctx.body = 'Hello World!'
    }

    @RequestMapping('/test')
    public test(ctx) {
      ctx.body = 'Test'
    }
  }
}
