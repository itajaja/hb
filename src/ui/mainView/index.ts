import * as html from 'choo/html'

import { View } from 'choo'
import app from '../app'

app.model<{}>({
  state: { },
  reducers: { },
})

export default (function stageView(state, prev, send) {
  return html`
    <div>
      <a href="battle">START GAME</a>
    </div>
  `
}) as View<{}>
