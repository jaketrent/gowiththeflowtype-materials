import page from 'page'

import index from './pages/index'

export type RouteContext = {
  params: {
    [string]: string
  }
}

export type Router = {}

export type NextFunction = (err?: ?Error) => mixed

export const routeWithPage = (page: page, path: string, ...middleware) =>
  page(path, ...middleware.map(m => m.bind(null, path)))

const route = routeWithPage.bind(null, page)

export const map = () => {
  route('/', _ => page.redirect('/0'))
  route('/:id', index)
  page()
}
