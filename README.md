# koa-router-decorators

[![GitHub Actions](https://github.com/rx-ts/koa-router-decorators/workflows/Node%20CI/badge.svg)](https://github.com/rx-ts/koa-router-decorators/actions?query=workflow%3A%22Node+CI%22)
[![Codacy Grade](https://img.shields.io/codacy/grade/79e162c70dfd46d0bdb802e4c4d54f12)](https://www.codacy.com/gh/rx-ts/koa-router-decorators)
[![npm](https://img.shields.io/npm/v/@rxts/koa-router-decorators.svg)](https://www.npmjs.com/package/@rxts/koa-router-decorators)
[![GitHub Release](https://img.shields.io/github/release/rx-ts/koa-router-decorators)](https://github.com/rx-ts/koa-router-decorators/releases)

[![David Peer](https://img.shields.io/david/peer/rx-ts/koa-router-decorators.svg)](https://david-dm.org/rx-ts/koa-router-decorators?type=peer)
[![David](https://img.shields.io/david/rx-ts/koa-router-decorators.svg)](https://david-dm.org/rx-ts/koa-router-decorators)
[![David Dev](https://img.shields.io/david/dev/rx-ts/koa-router-decorators.svg)](https://david-dm.org/rx-ts/koa-router-decorators?type=dev)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![codechecks.io](https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true)](https://codechecks.io)

> Decorators for koa-router, inspired by Java Annotations of Spring MVC framework

## TOC <!-- omit in toc -->

## Install

```sh
# yarn
yarn add @rxts/koa-router-decorators

# npm
npm i -D @rxts/koa-router-decorators
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
