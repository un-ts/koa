import { Context } from 'koa'

import { Controller, RequestMapping } from '../lib'

import { LoginRequired } from './login-required'

@Controller
@RequestMapping('/user')
export class UserController {
  @RequestMapping('/login')
  public login(ctx: Context) {
    const { user } = ctx.query

    if (user) {
      ctx.session.user = user
      return ctx.redirect('/user/logon')
    }

    ctx.body = 'No user query'
  }

  @RequestMapping('/logout')
  public logout(ctx: Context) {
    ctx.session.user = null
    ctx.redirect('/user')
  }

  @RequestMapping()
  public helloUser(ctx: Context) {
    ctx.body = `Hello ${ctx.session.user || 'User'}!`
  }

  @LoginRequired
  @RequestMapping('/logon')
  public test(ctx: Context) {
    ctx.body = ctx.session.user + ' is logon'
  }
}