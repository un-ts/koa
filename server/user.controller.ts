import { Controller, RequestMapping } from '@rxts/koa-router-decorators'
import { Context } from 'koa'

import { LoginRequired } from './login-required'

@Controller
@RequestMapping('/user')
export class UserController {
  @RequestMapping('/login')
  login(ctx: Context) {
    const { user } = ctx.query

    if (user) {
      ctx.session!.user = user
      return ctx.redirect('/user/logon')
    }

    ctx.body = 'No user query'
  }

  @RequestMapping('/logout')
  logout(ctx: Context) {
    ctx.session!.user = null
    ctx.redirect('/user')
  }

  @RequestMapping()
  helloUser(ctx: Context) {
    ctx.body = `Hello ${ctx.session!.user || 'User'}!`
  }

  @LoginRequired
  @RequestMapping('/logon')
  test(ctx: Context) {
    ctx.body = String(ctx.session!.user) + ' is logon'
  }
}
