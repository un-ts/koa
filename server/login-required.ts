import { Routes, RoutesKey, Target } from '@rxts/koa-router-decorators'
import { Context } from 'koa'

export const LoginRequired = (
  target: Target,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  target = propertyKey ? target : target.prototype

  const routes: Routes | undefined = target[RoutesKey]

  if (!routes) {
    throw new ReferenceError('no routes found')
  }

  let handler = descriptor.value

  const index = routes.findIndex(route => {
    const routeHandler = route.handler
    return Array.isArray(routeHandler)
      ? routeHandler.includes(handler)
      : routeHandler === handler
  })

  const oldHandler = routes[index].handler

  handler = Array.isArray(oldHandler) ? oldHandler : [oldHandler]

  routes[index].handler = [
    (ctx: Context, next: () => void) => {
      if (!ctx.session!.user) {
        return ctx.redirect('/user/login')
      }

      next()
    },
    ...handler,
  ]
}
