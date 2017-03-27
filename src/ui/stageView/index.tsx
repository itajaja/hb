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
import { HEX_SIZE } from './iso'
import Map from './map'
import Overlays from './overlays'
import Sidebar from './sidebar'
import Store from './store'
import Things from './things'

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
  oldKeyPress: any
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
    const svg = this.refs.svg as SVGAElement
    const { x, y, width, height } = map.getBBox()
    svg.setAttribute(
      // tslint:disable-next-line:max-line-length
      'viewBox', `${x - HEX_SIZE} ${y - HEX_SIZE} ${width + HEX_SIZE * 2} ${height + HEX_SIZE * 2}`,
    )
    this.oldKeyPress = document.onkeypress
    document.onkeypress = this.onKeyPress
  }

  onKeyPress = (e: KeyboardEvent) => {
    const { game, playerFaction, selection } = this.state
    const unit = selection && selection.unit && selection.unit.unit
    const action = selection && selection.unit && selection.unit.action
    const int = parseInt(e.key, 10) - 1

    if (e.key === ' ' && !action) {
      const isAval = u => u.canPerformAction || u.mp > 0

      const playerUnits = game.factionUnits[playerFaction]
      const currentUnitIndex = playerUnits.findIndex(u =>
        u.id === (unit && unit.id),
      )
      const nextAvailableUnit = playerUnits.find(
        (u, i) => isAval(u) && i > currentUnitIndex,
      ) || playerUnits.find(isAval)
      if (nextAvailableUnit) {
        this.store.selectCell(game.map.cellAt(nextAvailableUnit.pos))
        e.preventDefault()
      }
    } else if (
      unit && unit.factionId === playerFaction && unit.actions[int]
      && unit.canPerformAction
    ) {
      this.store.selectAction(unit.actions[int])
    }
  }

  componentWillUnmount() {
    document.onkeypress = this.oldKeyPress
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
            <svg ref="svg" onMouseOut={() => this.store.hover(null)}>
              <g ref="map">
                <Map store={this.store} />
              </g>
              <g style={{ pointerEvents: 'none' }}>
                <Overlays store={this.store} />
                <Things store={this.store} />
              </g>
            </svg>
          </div>
        </Layout>
        <Sidebar store={this.store} />
      </Screen>
    )
  }
}
