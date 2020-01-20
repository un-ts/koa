import { Middleware } from 'koa'
import KoaRouter from 'koa-router'

export interface BoundedMiddleware extends Middleware {
  readonly original?: Middleware
}

export interface Route {
  handler: BoundedMiddleware | BoundedMiddleware[]
  method: Array<Method | undefined>
  path: Path
}

// eslint-disable-next-line @typescript-eslint/no-type-alias, @typescript-eslint/no-explicit-any
export type Target = any // type-coverage:ignore-line

export type Routes = Route[] & { path: Path }

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

// 将当前 routesList 中所有路由注入指定的 router 中
export const injectAllRoutes = <T, R>(router: KoaRouter<T, R>) => {
  while (routesList.length) {
    const routes = routesList.shift()!

    routes.forEach(({ handler, method, path = '' }) => {
      if (typeof routes.path === 'string' && typeof path === 'string') {
        path = routes.path + path
      }

      method.forEach(m =>
        router[m || Method.GET](
          path,
          ...(Array.isArray(handler) ? handler : [handler]),
        ),
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
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor,
  ): void => {
    // type-coverage:ignore-next-line
    target = propertyKey ? target : target.prototype

    if (!target[RoutesKey]) {
      target[RoutesKey] = []
    }

    const routes: Routes = target[RoutesKey]

    if (propertyKey) {
      descriptor =
        descriptor || Object.getOwnPropertyDescriptor(target, propertyKey)
      if (!descriptor || typeof descriptor.value !== 'function') {
        if (process.env.NODE_ENV === 'development') {
          console.warn('invalid usage of decorator `RequestMapping`')
        }
        return
      }

      const original: Middleware = descriptor.value
      routes.push({
        handler: Object.assign(original.bind(target), { original }),
        method: requestMethods,
        path: requestPath,
      })

      return
    }

    if (requestMethod) {
      routes.forEach(
        route =>
          (route.method = route.method[0] ? route.method : requestMethods),
      )
    }

    routes.path = requestPath as string
  }
}

export { RequestMapping }
