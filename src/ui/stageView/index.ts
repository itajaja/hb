import { css, StyleSheet } from 'aphrodite'
import * as html from 'choo/html'

import { View } from 'choo'

import Game from '../../engine/game'
import { createNewTestGame } from '../../newGame'
import app from '../app'
import cell from './cell'

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

interface IState { game: Game }

app.model<IState>({
  state: { game },
  reducers: {
    update: (state, data: any) => ({ game: data }),
  },
})

export default (function stageView(state, prev, send) {
  const vbFrom = -defaultViewBoxSize / 2
  const vbSize = defaultViewBoxSize

  const cells = game.map.cells.map(c => cell(c))

  return html`
    <div class=${css(style.main)}>
      <svg viewBox=${`${vbFrom} ${vbFrom} ${vbSize} ${vbSize}`}>
        <g>
          ${cells}
        </g>
      </svg>
    </div>
  `
}) as View<IState>
