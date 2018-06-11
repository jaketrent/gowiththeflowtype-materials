// @flow

import type { Narrative } from '../narratives/types'
import type { NextFunction, Router, RouteContext } from '../routes'

import * as data from './data'
import { NarrativeStore } from './store'

export type IndexRouteContext = {
  store: Store<Narrative>
} & RouteContext

export const fetchNarrativesWithData = async (
  data: { fetchAll: () => Promise<Result<Narrative[]>> },
  router: Router,
  ctx: IndexRouteContext,
  next: NextFunction
) => {
  const result = await data.fetchAll()
  if (result.ok) {
    ctx.store = new NarrativeStore(result.value)
  } else {
    router.redirect('/error/500')
  }
  next()
}

export const fetchNarratives = fetchNarrativesWithData.bind(this, data)
