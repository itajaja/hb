import OpponentAi from '../../ai/opponentAi'
import { UnitAction } from '../../engine/actions/action'
import Hex from '../../engine/hex'
import { ICell } from '../../engine/map'
import Unit from '../../engine/unit'
import BaseStore from '../utils/Store'

import { IState } from './index'

export default class Store extends BaseStore<IState> {
  indexCells(hexes: Hex[]): {[idx: string]: Hex} {
    const index = {}
    hexes.forEach(h => index[h.toString()] = h)
    return index
  }

  getCellInfo(target: ICell) {
    const { thing } = target

    return {
      cell: target,
      unit: (thing && thing instanceof Unit) ? {
        unit: thing!,
        paths: this.indexCells(thing.moveTargets()),
      } : undefined,
    }
  }

  selectCell = async (cell: ICell) => {
    const { selection, playerFaction } = this.state
    const unit = selection && selection.unit
    const action = unit && unit.action

    let newSelection
    if (action && action.targets[cell.pos.toString()]) {
      await action.action.execute(cell.pos)
    } else if (
      !action && unit && unit.unit.factionId === playerFaction
      && unit.paths[cell.pos.toString()]
    ) {
      await unit.unit.move(cell.pos)
      newSelection = this.getCellInfo(cell)
    } else {
      newSelection = this.getCellInfo(cell)
    }

    this.set({ selection: newSelection, hover: undefined })
  }

  selectAction = (action: UnitAction) => {
    const { selection } = this.state
    selection!.unit!.action = {
      action,
      targets: this.indexCells(action.targets()),
    }

    this.set({ selection, hover: undefined })
  }

  hover = (cell: ICell | null) => {
    if (!cell) {
      this.set({ hover: undefined })
      return
    }

    const { selection } = this.state
    const unit = selection && selection.unit
    const action = unit && unit.action

    if (action && action.action.params.area) {
      action.area = action.targets[cell.pos.toString()]
        ? this.indexCells(cell.pos.range(action.action.params.area))
        : undefined
    }

    this.set({ selection, hover: this.getCellInfo(cell) })
  }

  endTurn = async () => {
    const { game } = this.state
    await game.endTurn()
    this.set({
      selection: undefined,
      hover: undefined,
    })

    const currentFactionId = game.currenFaction.id
    if (currentFactionId !== this.state.playerFaction) {
      const opponent = new OpponentAi(this)
      await opponent.performTurn()
    }
    this.set({})
  }
}
