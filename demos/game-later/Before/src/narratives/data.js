// @flow

import type { Narrative } from './types'

export const fetchAll = async (): Promise<Narrative[]> => {
  const res = await fetch('http://localhost:1338/api/v1/narratives')
  return await res.json()
}
