import * as KoaRouter from 'koa-router'

const routesList = []

export type Path = string | RegExp

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

      router[method || MethodMap[Method.GET]](path, ...handler)
    })
  }
}

export const Controller = target => {
  routesList.push(target.prototype._routes)
}

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

export interface RequestMap {
  consumes?: string[]
  headers?: string[]
  method?: Method
  path?: Path
}

function RequestMapping(requestMap?: RequestMap)
function RequestMapping(path?: Path, method?: Method)
function RequestMapping(path?: Path | RequestMap, method?: Method) {
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
  const requestPath = requestMap.path

  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    target = propertyKey ? target : target.prototype

    if (!target._routes) {
      target._routes = []
    }

    if (propertyKey) {
      target._routes.push({
        handler: descriptor.value,
        method: MethodMap[requestMethod],
        path: requestPath
      })
    } else {
      if (requestMethod) {
        target._routes.forEach(route => (route.method = route.method || MethodMap[requestMethod]))
      }

      target._routes.path = requestPath
    }
  }
}

export { RequestMapping }
