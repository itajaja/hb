import Hex from '../hex'
import Unit from '../unit'
import { IActionResult, UnitAction } from './action'

export default class Heal extends UnitAction {
  name = 'Heal'
  description = 'Heal part of an adjacent unit\'s life back'

  params = {
    damage: -3,
  }
  manaCost = 1

  performAction(target: Hex) {
    const result: IActionResult = { targets: [] }

    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      result.targets!.push({
        unitId: targetUnit.id, damage: this.params.damage,
      })
    }

    return result
  }

  targets() {
    return this.unit.pos.neighbors.filter(this.game.map.isIn)
  }
}
