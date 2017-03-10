import { css, StyleSheet } from 'aphrodite'
import * as html from 'choo/html'

import { UnitAction } from '../../engine/actions/action'
import { Terrain } from '../../engine/map'
import Unit from '../../engine/unit'
import { Actions, IState } from './index'

const style = StyleSheet.create({
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
})

function renderActionButton(
  action: UnitAction, state: IState, actions: Actions,
) {
  const selectedAction = action ===  state.selectedAction

  return html`
    <span
      onclick=${() => actions.selectAction(action)}
      class=${css(selectedAction && style.selectedAction, style.button)}
    >
      ${action.name}
    </span>
  `
}

export default function sidebar(state: IState, actions: Actions) {
  const { game, selectedCell } = state
  const { currenFaction, epoch } = game
  let cellInfo

  if (selectedCell) {
    let unitInfo
    if (selectedCell.thing && selectedCell.thing instanceof Unit) {
      const unit = selectedCell.thing
      let unitActions

      if (currenFaction.id === unit.faction.id) {
        unitActions = unit.actions
          .map(a => renderActionButton(a, state, actions))
      }

      unitInfo = html`
        <p>
          Unit: ${unit.type.name}
          <br>
          hp: ${unit.hp}/${unit.type.hp}
          <br>
          mp: ${unit.mp}/${unit.type.mp}
          <br>
          ${unitActions}
        </p>
      `
    }
    cellInfo = html`
      <div>
        <p>terrain type: ${Terrain[selectedCell.terrain]}</p>
        ${unitInfo}
      </div>
    `
  }

  return html`
    <div class=${css(style.main)}>
      <h2>Turn: ${epoch} (${currenFaction.name})</h2>
      ${cellInfo}
    </div>
  `
}
