import { Middleware } from 'koa'
import KoaRouter from 'koa-router'

export interface Route {
  handler: Middleware | Middleware[]
  method: Array<Method | undefined>
  path: Path
}

// eslint-disable-next-line @typescript-eslint/no-type-alias, @typescript-eslint/no-explicit-any
export type Target = any // type-coverage:ignore-line

export type Routes = Route[] & { path: string }

const routesList: Routes[] = []

export enum Method {
  ALL = 'all',
  DELETE = 'delete',
  GET = 'get',
  HEAD = 'head',
  OPTIONS = 'options',
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put',
}

export type Path = string | RegExp

export const RoutesKey = Symbol('routes')

type Router = KoaRouter &
  Record<Method, (path: Path, ...middlewares: Middleware[]) => void>

// 将当前 routesList 中所有路由注入指定的 router 中
export const injectAllRoutes = (router: KoaRouter) => {
  while (routesList.length) {
    const routes = routesList.shift()!

    routes.forEach(({ handler, method, path = '' }) => {
      if (routes.path && typeof path === 'string') {
        path = routes.path + path
      }

      handler = Array.isArray(handler) ? handler : [handler]

      method.forEach(m =>
        (router as Router)[m || Method.GET](path, ...(handler as Middleware[])),
      )
    })
  }
}

// 路由控制器，添加到 class 声明上
export const Controller = (target: Target) => {
  // type-coverage:ignore-next-line
  routesList.push(target.prototype[RoutesKey])
}

export interface RequestMap {
  method?: Method | Method[]
  path?: Path
}

export type Decorator = ClassDecorator | MethodDecorator | PropertyDecorator

export type RequestMappingDecorator = (
  target: Target,
  propertyKey?: string,
  descriptor?: PropertyDescriptor,
) => void

// 路由 url 匹配规则，添加到类成员方法上
function RequestMapping(requestMap: RequestMap): RequestMappingDecorator
function RequestMapping(
  path?: Path,
  method?: Method | Method[],
): RequestMappingDecorator
// eslint-disable-next-line sonarjs/cognitive-complexity
function RequestMapping(path?: Path | RequestMap, method?: Method | Method[]) {
  if (typeof path === 'string' || path instanceof RegExp) {
    path = {
      method,
      path,
    }
  } else if (method !== undefined) {
    console.warn('method should not be passed in')
  }

  const requestMap: RequestMap = path || {}

  const requestMethod = requestMap.method
  const requestMethods = Array.isArray(requestMethod)
    ? requestMethod
    : [requestMethod]

  const requestPath = requestMap.path!

  return (
    target: Target,
    propertyKey?: string,
    descriptor?: PropertyDescriptor,
  ): void => {
    // type-coverage:ignore-next-line
    target = propertyKey ? target : target.prototype

    if (!target[RoutesKey]) {
      target[RoutesKey] = []
    }

    const routes: Routes = target[RoutesKey]

    if (propertyKey) {
      routes.push({
        // type-coverage:ignore-next-line
        handler: descriptor!.value,
        method: requestMethods,
        path: requestPath,
      })
    } else {
      if (requestMethod) {
        routes.forEach(
          route =>
            (route.method = route.method[0] ? route.method : requestMethods),
        )
      }

      routes.path = requestPath as string
    }
  }
}

export { RequestMapping }
