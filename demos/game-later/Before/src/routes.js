// @flow

import page from 'page'

import index from './pages/index'

export const map = () => {
  page('/', _ => page.redirect('/0'))
  page('/:id', index)
  page()
}
