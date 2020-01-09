# @rxts/koa

[![GitHub Actions](https://github.com/rx-ts/koa/workflows/Node%20CI/badge.svg)](https://github.com/rx-ts/koa/actions?query=workflow%3A%22Node+CI%22)
[![Codacy Grade](https://img.shields.io/codacy/grade/79e162c70dfd46d0bdb802e4c4d54f12)](https://www.codacy.com/gh/rx-ts/koa)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Frx-ts%2Fkoa%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![GitHub release](https://img.shields.io/github/release/rx-ts/koa)](https://github.com/rx-ts/koa/releases)
[![David Dev](https://img.shields.io/david/dev/rx-ts/koa.svg)](https://david-dm.org/rx-ts/koa?type=dev)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![codechecks.io](https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true)](https://codechecks.io)

> Incredible [Koa][] middlewares/plugins, make [Koa][] greater.

## TOC <!-- omit in toc -->

- [Packages](#packages)
- [Changelog](#changelog)
- [License](#license)

## Packages

This repository is a monorepo managed by [Lerna][] what means we actually publish several packages to npm from same codebase, including:

| Package                                                      | Description                                                                     | Version                                                                                                                           | Peer Dependencies                                                                                                                                                          | Dependencies                                                                                                                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@rxts/koa-proxy`](/packages/proxy)                         | `http-proxy` wrapper as Koa middleware                                          | [![npm](https://img.shields.io/npm/v/@rxts/koa-proxy.svg)](https://www.npmjs.com/package/@rxts/koa-proxy)                         | [![David Peer](https://img.shields.io/david/peer/rx-ts/koa.svg?path=packages/proxy)](https://david-dm.org/rx-ts/koa?path=packages/proxy&type=peer)                         | [![David](https://img.shields.io/david/rx-ts/koa.svg?path=packages/proxy)](https://david-dm.org/rx-ts/koa?path=packages/proxy)                         |
| [`@rxts/koa-router-decorators`](/packages/router-decorators) | Decorators for koa-router, inspired by Java Annotations of Spring MVC framework | [![npm](https://img.shields.io/npm/v/@rxts/koa-router-decorators.svg)](https://www.npmjs.com/package/@rxts/koa-router-decorators) | [![David Peer](https://img.shields.io/david/peer/rx-ts/koa.svg?path=packages/router-decorators)](https://david-dm.org/rx-ts/koa?path=packages/router-decorators&type=peer) | [![David](https://img.shields.io/david/rx-ts/koa.svg?path=packages/router-decorators)](https://david-dm.org/rx-ts/koa?path=packages/router-decorators) |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[koa]: https://github.com/koajs/koa
[jounqin]: https://GitHub.com/JounQin
[lerna]: https://github.com/lerna/lerna
[mit]: http://opensource.org/licenses/MIT
