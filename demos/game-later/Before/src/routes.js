// @flow

import page from 'page'

import index from './pages/index'

export type RouteContext = {
  params: {
    [string]: string
  }
}

export type Router = {}

export type NextFunction = (err?: ?Error) => mixed

export const routeWithPage = (
  page: page,
  path: string,
  ...middleware: ((Router, RouteContext, NextFunction) => mixed)[]
) => page(path, ...middleware.map(m => m.bind(null, page)))

const route = routeWithPage.bind(null, page)

export const map = () => {
  route('/', router => router.redirect('/0'))
  route('/:id', index)
  page()
}
