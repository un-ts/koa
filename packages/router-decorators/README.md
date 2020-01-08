# koa-router-decorators

> Decorators for koa-router, inspired by Java Annotations of Spring MVC framework

## TOC <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
- [Changelog](#changelog)
- [License](#license)

## Install

```sh
# yarn
yarn add @rxts/koa-router-decorators

# npm
npm i @rxts/koa-router-decorators
```

## Usage

```ts
import Koa, { Context } from 'koa'

import { Controller, Method, RequestMapping } from '@rxts/koa-router-decorators'

@Controller
@RequestMapping({
  method: Method.POST,
})
export class CommonController {
  @RequestMapping('/', Method.GET)
  helloWorld(ctx: Context) {
    ctx.body = 'Hello World'
  }

  @RequestMapping({
    method: Method.GET,
    path: /^\/\d{3}$/,
  })
  testRegExp(ctx: Context) {
    ctx.body = ctx.url
  }
}

const app = new Koa()
const router = new KoaRouter()

injectAllRoutes(router)

app.use(router.routes())
app.use(router.allowedMethods())
```

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
