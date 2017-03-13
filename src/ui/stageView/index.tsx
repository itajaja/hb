import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { IAction } from '../../engine/actions/action'
import Game from '../../engine/game'
import Hex from '../../engine/hex'
import { ICell } from '../../engine/map'
import { createNewTestGame } from '../../newGame'
import style from '../utils/style'
import Cell from './cell'
import Sidebar from './sidebar'
import Store from './store'

const game = createNewTestGame()

const styles = StyleSheet.create({
  main: {
    background: style.darkGrey,
    color: style.white,
    position: 'relative',
  },
})

export interface IState {
  game: Game,
  selectedCell?: ICell
  selectedAction?: IAction
  targets: { [idx: string]: Hex }
}

export default class Stageview extends React.Component<{}, IState> {
  store: Store

  constructor(props) {
    super(props)
    this.store = new Store(this)
    this.state = { game, targets: {} }
  }

  componentDidMount() {
    const map = this.refs.map as SVGAElement
    const { x, y, width, height } = map.getBBox()
    map.setAttribute(
      'viewBox', `${x - 10} ${y - 10} ${width + 20} ${height + 20}`,
    )
  }

  render() {
    return (
      <div className={css(styles.main)}>
        <Sidebar store={this.store} />
        <svg ref="map">
          <g>
            ${game.map.cells.map(c =>
              <Cell store={this.store} cell={c} key={c.pos.toString()}/>,
            )}
          </g>
        </svg>
      </div>
    )

  }
}
