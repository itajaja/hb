import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { UnitAction } from '../../engine/actions/action'
import { ICell, Terrain } from '../../engine/map'
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
  disabledAction: {
    cursor: 'not-allowed',
    filter: 'blur(1px)',
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

function renderActionButton(
  action: UnitAction, selectedAction: UnitAction | undefined, store: Store,
) {
  const isSelected = action === selectedAction
  const classes = css(
    styles.button,
    isSelected && styles.selectedAction,
    !action.canExecute && styles.disabledAction,
  )

  return (
    <span
      key={action.name}
      onClick={action.canExecute ? () => store.selectAction(action) : undefined}
      className={classes}
    >
      {action.name}
    </span>
  )
}

function renderCellInfo(cell: ICell) {
  return (
    <p>
      {cell.pos.toString()} - terrain type: {Terrain[cell.terrain]}
    </p>
  )
}

function renderUnitInfo(unit: Unit) {
  return (
    <div>
      Unit: {unit.type.name}
      <br />
      Satus: {UnitState[unit.state]}
      <br />
      hp: {unit.hp}/{unit.type.hp}
      <br />
      mp: {unit.mp}/{unit.type.mp}
      <br />
      mana: {unit.mana}/{unit.type.mana}
      <br />
      resistance: {unit.resistance}
    </div>
  )
}

function renderActions(
  unit: Unit, selectedAction: UnitAction | undefined, store: Store,
) {
  return (
    <div>
      {unit.actions.map(a => renderActionButton(a, selectedAction, store))}
      <br />
      {selectedAction && selectedAction.description}
    </div>
  )
}

interface IProps {
  store: Store,
}

export default function Sidebar({ store }: IProps) {
  const { game, hover, selection, playerFaction } = store.state
  const { currenFaction, epoch } = game
  const unit =  (hover && hover.unit) || (selection && selection.unit)
  const cell =  (hover && hover.cell) || (selection && selection.cell)
  const action = hover ? undefined : selection && selection.unit
    && selection.unit.action && selection.unit.action.action

  const cellInfo = cell && renderCellInfo(cell)
  const unitInfo = unit && renderUnitInfo(unit.unit)
  const actionsInfo = unit && unit.unit.factionId === playerFaction
    && unit.unit.canPerformAction && renderActions(unit.unit, action, store)

  return (
    <Layout classes={[styles.main]}>
      <div className={css(styles.container)}>
        <h2>Turn: {epoch} ({currenFaction.name})</h2>
        {cellInfo}
        {unitInfo}
        {actionsInfo}
      </div>
      <Layout grow />
      <div className={css(styles.endTurnButton)} onClick={store.endTurn}>
        End Turn
      </div>
    </Layout>
  )
}
