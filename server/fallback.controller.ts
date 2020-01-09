import { proxy } from '@rxts/koa-proxy'
import { Controller, RequestMapping } from '@rxts/koa-router-decorators'
import { Context } from 'koa'

const proxied = proxy({
  changeOrigin: true,
  target: 'https://jsonplaceholder.typicode.com',
  secure: true,
})

@Controller
export class FallbackController {
  @RequestMapping('*')
  jsonPlaceholder(ctx: Context, next: () => Promise<void>) {
    return proxied(ctx, next)
  }
}
