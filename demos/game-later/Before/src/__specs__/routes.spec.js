// @flow
import { routeWithPage } from '../routes'

describe('#routeWithPage', () => {
  // removable -- verifying signature; flawed by varargs
  test('takes router, path and middleware', () => {
    expect(routeWithPage.length).toBe(2) // 2 - 1 for ...args middleware
  })

  // removable -- calls -- do args route correctly; proves nothing, except usage is correct; types verify that
  // unit test that gave us comfort, doesn't verify much more than types already do; more safety in exercising real routing
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

  // removable -- calls to middleware have router as first arg; types verify that
  test('router is passed to all middleware', done => {
    const router = (p, ...mw) => {
      expect(p).toEqual(path)
      mw.forEach(mw => mw())
      expect(Array.isArray(mw)).toBe(true)
      expect(mw.length).toBe(2)
      done()
    }
    const path = '/some/path'
    const mw1 = r => {
      expect(r).toEqual(router)
    }
    const mw2 = r => {
      expect(r).toEqual(router)
    }
    routeWithPage(router, path, mw1, mw2)
  })
})
