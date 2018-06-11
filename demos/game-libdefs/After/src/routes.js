// @flow
import page from 'page'

import { fetchNarratives } from './narratives/middleware'
import index from './pages/index'
import error from './pages/error'

export type RouteContext = {
  params: {
    [string]: string
  }
}

export type Router = {
  redirect: string => void
}

export type NextFunction = (err?: ?Error) => mixed

export const routeWithPage = (
  page: page,
  path: string,
  ...middleware: ((Router, RouteContext, NextFunction) => mixed)[]
) => page(path, ...middleware.map(m => m.bind(null, page)))

const route = routeWithPage.bind(null, page)

export const map = () => {
  route('/', _ => page.redirect('/0'))
  route('/:id', fetchNarratives, index)
  route('/error/:code', error)
  route('*', error)
  page()
}
