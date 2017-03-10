import { css, StyleSheet } from 'aphrodite'
import { View } from 'choo'
import * as html from 'choo/html'

import Game from '../../engine/game'
import { createNewTestGame } from '../../newGame'
import app from '../app'
import BaseActions from '../utils/Actions'
import cell from './cell'
import sidebar from './sidebar'

const game = createNewTestGame()
const defaultViewBoxSize = 600

const style = StyleSheet.create({
  main: {
    background: '#27272A',
    color: 'white',
    fontFamily: 'Roboto, sans-serif',
    position: 'relative',
  },
})

export interface IState {
  game: Game,
  selectedCell?: string
}

export class Actions extends BaseActions {
  selectCell = (selectedCell: string) => {
    this.perform({ selectedCell })
  }
}

app.model<IState>({
  state: { game },
  reducers: {
    all: (prev, state: IState) => state,
  },
})

export default (function stageView(state, prev, send) {
  const vbFrom = -defaultViewBoxSize / 2
  const vbSize = defaultViewBoxSize

  const actions = new Actions(state, send)
  const cells = game.map.cells.map(c => cell(c, state, actions))

  return html`
    <div class=${css(style.main)}>
      ${sidebar(state, actions)}
      <svg viewBox=${`${vbFrom} ${vbFrom} ${vbSize} ${vbSize}`}>
        <g>
          ${cells}
        </g>
      </svg>
    </div>
  `
}) as View<IState>
