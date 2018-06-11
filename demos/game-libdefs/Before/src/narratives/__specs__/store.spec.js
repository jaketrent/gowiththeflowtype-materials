// @flow

import type { Narrative } from '../types'

import { NarrativeStore } from '../store'

const narratives: Narrative[] = [
  { id: 123, text: 'first narrative' },
  { id: 234, text: 'second narrative' },
  { id: 345, text: 'third narrative' },
  { id: 456, text: 'fourth narrative' }
]

describe('NarrativeStore', () => {
  test('#find returns narrative', () => {
    const store = new NarrativeStore(narratives)
    const expected = narratives[2]
    const actual = store.find(expected.id)
    expect(actual).toEqual(expected)
  })

  test('#find returns undefined when not found', () => {
    const store = new NarrativeStore(narratives)
    const actual = store.find(333)
    expect(actual).toEqual(undefined)
  })
})
