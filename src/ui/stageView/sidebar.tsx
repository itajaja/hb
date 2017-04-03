import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { UnitAction } from '../../engine/actions/action'
import { ICell, Terrain } from '../../engine/map'
import Unit, { UnitStatus } from '../../engine/unit'
import ActionGlyph from '../components/actionGlyph'
import Layout from '../components/layout'
import UnitGlyph from '../components/unitGlyph'
import style from '../utils/style'
import Store from './store'

const styles = StyleSheet.create({
  main: {
    borderLeft: style.border,
    width: 400,
  },
  container: {
    padding: 10,
  },
  button: {
    padding: 2,
    cursor: 'pointer',
    border: '5px solid transparent',
  },
  subText: {
    fontSize: 'smaller',
  },
  disabledAction: {
    cursor: 'default',
    color: style.grey,
  },
  disabledActionIcon: {
    fill: style.grey,
  },
  selectedAction: {
    borderColor: style.gold,
  },
  endTurnButton: {
    padding: 20,
    textAlign: 'center',
    background: style.darkGrey,
    borderTop: style.border,
    cursor: 'pointer',
  },
  unitIcon: {
    width: '30%',
    height: '1%',
  },
  hpBar: { color: style.hpColor },
  mpBar: { color: style.mpColor },
  manaBar: { color: style.manaColor },
})

function renderActionButton(
  action: UnitAction, selectedAction: UnitAction | undefined, store: Store,
) {
  const isSelected = action === selectedAction
  const classes = [
    styles.button,
    isSelected && styles.selectedAction,
    !action.canExecute && styles.disabledAction,
  ]
  let manaCost
  if (action.manaCost) {
    manaCost = (
      <span className={css(styles.manaBar)}>
        ({action.manaCost} mana)
      </span>
    )
  }

  return (
    <Layout
      key={action.name}
      onClick={action.canExecute ? () => store.selectAction(action) : undefined}
      classes={classes}
      direction="row"
      align="center"
    >
      <ActionGlyph
        action={action}
        wrapped={true}
        classes={!action.canExecute && styles.disabledActionIcon}
      />
      <Layout grow>
        {action.name} {manaCost}
        <div className={css(styles.subText)}>
          {action.description}
        </div>
      </Layout>
    </Layout>
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
  const statuses = Array.from(unit.status.keys()).map(s => UnitStatus[s])

  return (
    <div>
      <Layout direction="row" >
        <UnitGlyph
          unitType={unit.type}
          classes={styles.unitIcon}
          wrapped={true}
        />
        <Layout>
          <div>
            {unit.type.name}            
          </div>
          <div>
            Satus: {statuses.join() || '—'}
          </div>
          <div>
            resistance: {unit.resistance}
          </div>
          <div className={css(styles.hpBar)}>
            hp: {unit.hp}/{unit.type.hp}
          </div>
          <div className={css(styles.mpBar)}>
            mp: {unit.mp}/{unit.type.mp}
          </div>
          <div className={css(styles.manaBar)}>
            mana: {unit.mana}/{unit.type.mana}
          </div>
        </Layout>
      </Layout>
    </div>
  )
}

function renderActions(
  unit: Unit, selectedAction: UnitAction | undefined, store: Store,
) {
  return (
    <div>
      {unit.actions.map(a => renderActionButton(a, selectedAction, store))}
    </div>
  )
}

interface IProps {
  store: Store,
}

export default function Sidebar({ store }: IProps) {
  const { game, hover, selection } = store.state
  const { currenFaction, epoch } = game
  const unit =  (hover && hover.unit) || (selection && selection.unit)
  const cell =  (hover && hover.cell) || (selection && selection.cell)
  const action = hover ? undefined : selection && selection.unit
    && selection.unit.action && selection.unit.action.action

  const cellInfo = cell && renderCellInfo(cell)
  const unitInfo = unit && renderUnitInfo(unit.unit)
  const actionsInfo = unit && renderActions(unit.unit, action, store)

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
