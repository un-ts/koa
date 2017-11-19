import * as KoaRouter from 'koa-router'

const routesList = []

export enum Method {
  ALL,
  DELETE,
  GET,
  HEAD,
  OPTIONS,
  PATCH,
  POST,
  PUT
}

const MethodMap = {
  [Method.ALL]: 'all',
  [Method.DELETE]: 'del',
  [Method.GET]: 'get',
  [Method.HEAD]: 'head',
  [Method.OPTIONS]: 'options',
  [Method.PATCH]: 'patch',
  [Method.POST]: 'post',
  [Method.PUT]: 'put',
  [Method.HEAD]: 'head'
}

export type Path = string | RegExp

export const RoutesKey = Symbol('routes')

export const injectAllRoutes = (router: KoaRouter) => {
  if (!router || !(router instanceof KoaRouter)) {
    throw new ReferenceError('no Koa Router instance passed in')
  }

  while (routesList.length) {
    const routes = routesList.shift()

    routes.forEach(({ handler, method, path = '' }) => {
      if (routes.path && typeof path === 'string') {
        path = routes.path + path
      }

      handler = Array.isArray(handler) ? handler : [handler]

      method.forEach(m => router[m || MethodMap[Method.GET]](path, ...handler))
    })
  }
}

export const Controller = target => {
  routesList.push(target.prototype[RoutesKey])
}

export interface RequestMap {
  consumes?: string[]
  headers?: string[]
  method?: Method | Method[]
  path?: Path
}

function RequestMapping(requestMap?: RequestMap)
function RequestMapping(path?: Path, method?: Method | Method[])
function RequestMapping(path?: Path | RequestMap, method?: Method | Method[]) {
  if (typeof path === 'string' || path instanceof RegExp) {
    path = {
      method,
      path
    }
  } else if (method !== undefined) {
    throw new ReferenceError('method should not be passed in')
  }

  const requestMap: RequestMap = path || {}

  const requestMethod = requestMap.method
  const requestMethods = Array.isArray(requestMethod) ? requestMethod : [requestMethod]
  const methods = requestMethods.map(m => MethodMap[m])

  const requestPath = requestMap.path

  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    target = propertyKey ? target : target.prototype

    if (!target[RoutesKey]) {
      target[RoutesKey] = []
    }

    const routes = target[RoutesKey]

    if (propertyKey) {
      routes.push({
        handler: descriptor.value,
        method: methods,
        path: requestPath
      })
    } else {
      if (requestMethod) {
        routes.forEach(route => (route.method = route.method || methods))
      }

      routes.path = requestPath
    }
  }
}

export { RequestMapping }
