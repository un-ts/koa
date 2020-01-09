import { ClientRequest, IncomingMessage, ServerResponse } from 'http'

import httpProxy, { ServerOptions } from 'http-proxy'
import {
  DefaultContext,
  DefaultState,
  Middleware,
  ParameterizedContext,
} from 'koa'
import { Url } from 'url'

export type ProxyTargetUrl = string | Partial<Url>

export interface ProxyEventListener {
  error?: (
    err: Error,
    req: IncomingMessage,
    res: ServerResponse,
    target?: ProxyTargetUrl,
  ) => void
  start?: (
    req: IncomingMessage,
    res: ServerResponse,
    target: ProxyTargetUrl,
  ) => void
  proxyReq?: (
    proxyReq: ClientRequest,
    req: IncomingMessage,
    res: ServerResponse,
    options: ServerOptions,
  ) => void
  proxyRes?: (
    proxyRes: IncomingMessage,
    req: IncomingMessage,
    res: ServerResponse,
  ) => void
  econnreset?: (
    err: Error,
    req: IncomingMessage,
    res: ServerResponse,
    target: ProxyTargetUrl,
  ) => void
  end?: (
    req: IncomingMessage,
    res: ServerResponse,
    proxyRes: IncomingMessage,
  ) => void
}

export interface KoaProxyOptions<StateT, CustomT> extends ServerOptions {
  listeners?: ProxyEventListener
  override?: (ctx: ParameterizedContext<StateT, CustomT>) => ServerOptions
  skipError?: boolean
}

export const proxy = <StateT = DefaultState, CustomT = DefaultContext>({
  listeners = {},
  override,
  skipError,
  ...options
}: KoaProxyOptions<StateT, CustomT> = {}): Middleware<StateT, CustomT> => {
  const proxy = httpProxy.createProxyServer(options)

  Object.keys(listeners).forEach(event => {
    const listener = listeners[event as keyof ProxyEventListener]
    if (listener) {
      // @ts-ignore
      proxy.on(event, listener)
    }
  })

  return (ctx, next) =>
    new Promise((resolve, reject) => {
      proxy.web(
        ctx.req,
        ctx.res,
        typeof override === 'function' ? override(ctx) : undefined,
        err =>
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          err ? (skipError ? resolve(next()) : reject(err)) : resolve(),
      )
    })
}

export default proxy
