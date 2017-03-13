import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { UnitAction } from '../../engine/actions/action'
import { Terrain } from '../../engine/map'
import Unit, { UnitState } from '../../engine/unit'
import Store from './store'

const styles = StyleSheet.create({
  main: {
    position: 'fixed',
    right: 0,
    background: 'rgb(48, 62, 69)',
    borderLeft: '3px solid rgb(133, 113, 0)',
    padding: 10,
    top: 0,
    bottom: 0,
    width: 400,
  },
  button: {
    padding: 3,
    border: '1px solid rgb(133, 113, 0)',
    cursor: 'pointer',
  },
  selectedAction: {
    background: 'rgb(133, 113, 0)',
  },
  endTurnButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    textAlign: 'center',
    background: '#27272a',
    borderTop: '2px solid #857100',
    cursor: 'pointer',
  },
})

function renderActionButton(action: UnitAction, store: Store) {
  const selectedAction = action === store.state.selectedAction

  return (
    <span
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
              <div>{i}: {selectedAction.params[i]}</div>,
            )}
          </div>
        )
      }

      unitInfo = (
        <p>
          Unit: {unit.type.name}
          <br />
          Satus: {UnitState[unit.state]}
          <br />
          hp: {unit.hp}/{unit.type.hp}
          <br />
          mp: {unit.mp}/{unit.type.mp}
          <br />
          {unitActions}
          {selectedActionDescription}
        </p>
      )
    }
    cellInfo = (
      <div>
        <p>terrain type: {Terrain[selectedCell.terrain]}</p>
        {unitInfo}
      </div>
    )
  }

  return (
    <div className={css(styles.main)}>
      <h2>Turn: {epoch} ({currenFaction.name})</h2>
      {cellInfo}
      <div className={css(styles.endTurnButton)} onClick={store.endTurn}>
        End Turn
      </div>
    </div>
  )
}
