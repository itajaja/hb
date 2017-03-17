import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { UnitAction } from '../../engine/actions/action'
import Game from '../../engine/game'
import Hex from '../../engine/hex'
import { ICell } from '../../engine/map'
import Unit from '../../engine/unit'
import Dialog from '../components/dialog'
import Layout from '../components/layout'
import Screen from '../components/screen'
import MainStore from '../mainStore'
import Cell from './cell'
import Sidebar from './sidebar'
import Store from './store'

const styles = StyleSheet.create({
  mapContainer: {
    overflow: 'auto',
  },
})

export interface IProps {
  store: MainStore,
}

export interface IState {
  playerFaction: string
  game: Game,

  selection?: {
    cell: ICell,
    unit?: {
      unit: Unit,
      paths: { [idx: string]: Hex },
      action?: {
        action: UnitAction,
        targets: { [idx: string]: Hex },
        area?: { [idx: string]: Hex },
      },
    },
  }

  hover?: {
    cell: ICell,
    unit?: {
      unit: Unit,
      paths: { [idx: string]: Hex },
    },
  }
}

export default class Stageview extends React.Component<IProps, IState> {
  store: Store

  constructor(props) {
    super(props)
    const currentGame = this.props.store.state.currentGame!

    this.store = new Store(this)
    this.state = {
      playerFaction: currentGame.playerFaction,
      game: currentGame.game,
    }
  }

  componentDidMount() {
    const map = this.refs.map as SVGAElement
    const { x, y, width, height } = map.getBBox()
    map.setAttribute(
      'viewBox', `${x - 10} ${y - 10} ${width + 20} ${height + 20}`,
    )
  }

  renderGameOver(winningFaction: string) {
    const { finishGame } = this.props.store
    const { playerFaction } = this.state
    const playerWon = winningFaction === playerFaction

    return (
      <Dialog>
        <Dialog.Title>GAME OVER</Dialog.Title>
        <Dialog.Content>
          {playerWon ? 'YOU WON' : 'YOU LOST'}
        </Dialog.Content>
        <Dialog.Controls>
          <Dialog.Control onClick={() => finishGame(playerWon)}>
            OK
          </Dialog.Control>
        </Dialog.Controls>
      </Dialog>
    )
  }

  render() {
    const winningFaction = this.state.game.checkGameOver()
    let dialog
    if (winningFaction) {
      dialog = this.renderGameOver(winningFaction)
    }

    return (
      <Screen direction="row">
        {dialog}
        <Layout justify="center" grow>
          <div className={css(styles.mapContainer)}>
            <svg ref="map">
              <g>
                ${this.state.game.map.cells.map(c =>
                  <Cell store={this.store} cell={c} key={c.pos.toString()} />,
                )}
              </g>
            </svg>
          </div>
        </Layout>
        <Sidebar store={this.store} />
      </Screen>
    )
  }
}
