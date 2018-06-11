// @flow

import type { RouteContext } from '../routes'

import { html, render } from 'lit-html'

type ErrorProps = {
  code: string
}

const error = (props: ErrorProps) => html`
  <div class="error__content">
    <div class="error__text">Your story has ended in an error.</div>
    <div class="error__code">${props.code}</div>
    <a href="/" class="error__start">Start over?</a>
  </div>
`

export default (_: any, ctx: RouteContext) => {
  render(
    error({ code: ctx.params.code || '404' }),
    document.getElementById('app')
  )
}
