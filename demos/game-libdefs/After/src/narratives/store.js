// @flow

import type { Narrative, NarrativeId } from './types'

export class NarrativeStore implements Store<Narrative> {
  data: Narrative[]
  constructor(narratives: ?(Narrative[])) {
    this.data = narratives || []
  }
  find(id: NarrativeId): ?Narrative {
    return this.data.find(n => n.id === parseInt(id, 10))
  }
}
