// @flow
import { routeWithPage } from '../routes'

describe('#routeWithPage', () => {
  test('calls router with path and middleware', done => {
    const router = (p, ...mw) => {
      expect(p).toEqual(path)
      expect(Array.isArray(mw)).toBe(true)
      expect(mw.length).toBe(1)
      done()
    }
    const path = '/some/path'
    const mw1 = _ => {}
    routeWithPage(router, path, mw1)
  })
})
