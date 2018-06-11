// @flow
import type { IndexRouteContext } from '../narratives/middleware'
import type { Narrative, NarrativeId } from '../narratives/types'
import type { Router } from '../routes'

import { render, html } from 'lit-html'

import { fetchAll } from '../narratives/data'
import { NarrativeStore } from '../narratives/store'

type IndexProps = {
  narrative: Narrative,
  store: { data: Narrative[] }
}

export const title = (_: IndexProps): TemplateResult => html`
  <h4 class="index__title">
    <a href="/" class="index__title-link">
      Galactic Pigs: A Prelude
    </a>
  </h4>
`

export const image = (props: IndexProps): ?TemplateResult =>
  props.narrative.image
    ? html`<img src="${props.narrative.image}" class="index__image" />`
    : null

export const end = (props: IndexProps): ?TemplateResult =>
  props.narrative.choices
    ? null
    : html`<div class="index__end">The end.  Now play the game...</div>`

export const text = (props: IndexProps): TemplateResult =>
  html`<div class="index__text">${props.narrative.text}</div>`

export const prompt = (props: IndexProps): ?TemplateResult =>
  props.narrative.prompt
    ? html`<div class="index__prompt">${props.narrative.prompt}</div>`
    : null

export const choice = (props: IndexProps): ?TemplateResult =>
  props.narrative.choiceText
    ? html`
  <div class="index__choice">
    <a href="${props.narrative.id}" class="index__choice-button">${
        props.narrative.choiceText
      }</a>
  </div>
`
    : null

export const getChoices = (props: IndexProps): Narrative[] =>
  props.store.data.filter(
    n =>
      Array.isArray(props.narrative.choices) &&
      props.narrative.choices.some((id: NarrativeId) => id === n.id)
  )

const choices = (props: IndexProps): TemplateResult => html`
  <div class="index__choices">
    ${getChoices(props).map(n => choice({ narrative: n, store: props.store }))}
  </div>
`

const index = (props: IndexProps): TemplateResult => html`
  <div class="index">
    ${title(props)}
    <div class="index__body">
      ${text(props)}
      ${image(props)}
    </div>
    <div class="index__footer" aria-hidden="true">
      ${prompt(props)}
      ${choices(props)}
      ${end(props)}
    </div>
    <div class="index__footer index__footer--overlay">
      ${prompt(props)}
      ${choices(props)}
      ${end(props)}
    </div>
  </div>
`

export default (router: Router, ctx: IndexRouteContext) => {
  const routeId: number = parseInt(ctx.params.id, 10)
  const narrative = ctx.store.find(routeId)
  if (narrative) {
    render(
      index({ narrative, store: ctx.store }),
      document.getElementById('app')
    )
  } else {
    router.redirect('/error/404')
  }
}
