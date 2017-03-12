import { css, StyleSheet } from 'aphrodite'
import { View } from 'choo'
import * as html from 'choo/html'

import { IAction } from '../../engine/actions/action'
import Game from '../../engine/game'
import Hex from '../../engine/hex'
import { ICell } from '../../engine/map'
import Unit from '../../engine/unit'
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
  selectedCell?: ICell
  selectedAction?: IAction
  targets: {[idx: string]: Hex}
}

export class Actions extends BaseActions<IState> {
  selectCell = (selectedCell: ICell) => {
    const { pos, thing } = selectedCell
    const targets: {[idx: string]: Hex} = {}
    const prevCell = this.state.selectedCell

    if (thing && thing instanceof Unit
      && thing.factionId === game.currenFaction.id
    ) {
      thing.moveTargets().forEach(h => targets[h.toString()] = h)
    }
    if (this.state.targets && this.state.targets[pos.toString()] ) {
      // hit targeted cell
      if (this.state.selectedAction) { // do action
        this.state.selectedAction!.execute(pos)
      } else { // if there is no action, it's move
        (prevCell!.thing! as Unit).move(pos)
      }
      this.perform({
        selectedAction: undefined,
        targets: undefined,
        selectedCell: undefined,
      })
    } else {
      this.perform({
        selectedCell,
        selectedAction: undefined,
        targets,
      })
    }
  }
  selectAction = (selectedAction: IAction) => {
    const targets = {}
    selectedAction.targets().forEach(h => targets[h.toString()] = h)
    this.perform({ selectedAction, targets })
  }
  endTurn = () => {
    this.state.game.endTurn()
    this.perform({
      selectedAction: undefined,
      targets: undefined,
      selectedCell: undefined,
    })
  }
}

app.model<IState>({
  state: { game, targets: {} },
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
