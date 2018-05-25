import { fetchAll } from '../data'

describe('#fetchAll', () => {
  test('calls fetch with server url', done => {
    const fetchSpy = async url => {
      expect(url).toEqual('http://localhost:1338/api/v1/narratives')
      done()
    }
    fetchAll(fetchSpy)
  })

  test('calls fetch.json on response', async () => {
    let jsonCalled = false
    const fetchSpy = async url => ({
      json: _ => (jsonCalled = true)
    })
    await fetchAll(fetchSpy)
    expect(jsonCalled).toBe(true)
  })

  test('returns fetch.json in result', async () => {
    const expected = [{ id: 123, text: 'some text' }]
    const fetchSpy = async url => ({
      json: _ => expected
    })
    const actual = await fetchAll(fetchSpy)
    expect(actual).toBe(expected)
  })

  test('returns error in failed fetch', () => {
    const expected = new Error('some fetch error')
    const fetchSpy = async url => {
      throw expected
    }
    expect(fetchAll(fetchSpy)).rejects.toEqual(expected)
  })

  test('returns error in failed json parse', async () => {
    const expected = new Error('some json parse error')
    const fetchSpy = async url => ({
      json: _ => {
        throw expected
      }
    })
    expect(fetchAll(fetchSpy)).rejects.toEqual(expected)
  })
})
