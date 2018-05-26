// @flow
import type { Narrative, NarrativeId } from '../narratives/types'
import type { Router, RouteContext } from '../routes'

import { render, html } from 'lit-html'

import { fetchAll } from '../narratives/data'

type IndexProps = {
  narrative: Narrative,
  store: { data: Narrative[] }
}

export const title = (_: IndexProps) => html`
  <h4 class="index__title">
    <a href="/" class="index__title-link">
      Galactic Pigs: A Prelude
    </a>
  </h4>
`

export const image = (props: IndexProps) =>
  props.narrative.image
    ? html`<img src="${props.narrative.image}" class="index__image" />`
    : null

export const end = (props: IndexProps) =>
  props.narrative.choices
    ? null
    : html`<div class="index__end">The end.  Now play the game...</div>`

export const text = (props: IndexProps) =>
  html`<div class="index__text">${props.narrative.text}</div>`

export const prompt = (props: IndexProps) =>
  props.narrative.prompt
    ? html`<div class="index__prompt">${props.narrative.prompt}</div>`
    : null

export const choice = (props: IndexProps) =>
  props.narrative.choiceText
    ? html`
  <div class="index__choice">
    <a href="${props.narrative.id}" class="index__choice-button">${
        props.narrative.choiceText
      }</a>
  </div>
`
    : null

export const getChoices = (props: IndexProps) =>
  props.store.data.filter(
    n =>
      Array.isArray(props.narrative.choices) &&
      props.narrative.choices.some((id: NarrativeId) => id === n.id)
  )

const choices = (props: IndexProps) => html`
  <div class="index__choices">
    ${getChoices(props).map(n => choice({ narrative: n, store: props.store }))}
  </div>
`

const index = (props: IndexProps) => html`
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

export default async (router: Router, ctx: RouteContext) => {
  const data = await fetchAll()
  const store: { data: Narrative[] } = {
    data
  }
  const routeId: number = parseInt(ctx.params.id, 10)
  const narrative = store.data.find(n => n.id === routeId)
  if (narrative) {
    render(index({ narrative, store }), document.getElementById('app'))
  } else {
    console.log('lameo')
  }
}
