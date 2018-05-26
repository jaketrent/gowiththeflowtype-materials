// @flow

import { NarrativeStore } from '../store'

import { fetchNarrativesWithData } from '../middleware'

describe('#fetchNarrativesWithData', () => {
  test('data result added to route context', async done => {
    const expected = [{ id: 234, text: 'some text' }]
    const dataStub = {
      fetchAll: async _ => ({ ok: true, value: expected })
    }
    const context = { params: {}, store: new NarrativeStore() }
    const router = { redirect: _ => {} }
    const nextSpy = _ => {
      expect(context.store.data).toEqual(expected)
      done()
    }
    await fetchNarrativesWithData(dataStub, router, context, nextSpy)
  })
})
