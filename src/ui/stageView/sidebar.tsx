import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { UnitAction } from '../../engine/actions/action'
import { Terrain } from '../../engine/map'
import Unit, { UnitState } from '../../engine/unit'
import Layout from '../components/layout'
import style from '../utils/style'
import Store from './store'

const styles = StyleSheet.create({
  main: {
    background: style.darkGreen,
    borderLeft: style.border,
    width: 400,
  },
  container: {
    padding: 10,
  },
  button: {
    padding: 10,
    margin: '10px 0',
    border: `1px solid ${style.gold}`,
    cursor: 'pointer',
    display: 'inline-block',
  },
  selectedAction: {
    background: style.gold,
  },
  endTurnButton: {
    padding: 20,
    textAlign: 'center',
    background: style.darkGrey,
    borderTop: style.border,
    cursor: 'pointer',
  },
})

function renderActionButton(action: UnitAction, store: Store) {
  const selectedAction = action === store.state.selectedAction

  return (
    <span
      key={action.name}
      onClick={() => store.selectAction(action)}
      className={css(selectedAction && styles.selectedAction, styles.button)}
    >
      {action.name}
    </span>
  )
}

interface IProps {
  store: Store,
}

export default function Sidebar({ store }: IProps) {
  const { game, selectedCell } = store.state
  const { currenFaction, epoch } = game
  let cellInfo

  if (selectedCell) {
    let unitInfo
    if (selectedCell.thing && selectedCell.thing instanceof Unit) {
      const unit = selectedCell.thing
      const selectedAction = unit.actions
        .find(a => a === store.state.selectedAction)
      let unitActions
      let selectedActionDescription

      if (
        currenFaction.id === unit.faction.id &&
        unit.canPerformAction
      ) {
        unitActions = unit.actions.map(a => renderActionButton(a, store))
      }
      if (selectedAction) {
        selectedActionDescription = (
          <div>
            {selectedAction.description}
            <br />
            {Object.keys(selectedAction.params).map(i =>
              <div key={i}>{i}: {selectedAction.params[i]}</div>,
            )}
          </div>
        )
      }

      unitInfo = (
        <div>
          Unit: {unit.type.name}
          <br />
          Satus: {UnitState[unit.state]}
          <br />
          hp: {unit.hp}/{unit.type.hp}
          <br />
          mp: {unit.mp}/{unit.type.mp}
          <div>
            {unitActions}
          </div>
          {selectedActionDescription}
        </div>
      )
    }
    cellInfo = (
      <div>
        <p>
          {selectedCell.pos.toString()} -
          terrain type: {Terrain[selectedCell.terrain]}
        </p>
        {unitInfo}
      </div>
    )
  }

  return (
    <Layout classes={[styles.main]}>
      <div className={css(styles.container)}>
        <h2>Turn: {epoch} ({currenFaction.name})</h2>
        {cellInfo}
      </div>
      <Layout grow />
      <div className={css(styles.endTurnButton)} onClick={store.endTurn}>
        End Turn
      </div>
    </Layout>
  )
}
