import Hex from '../hex'
import Unit, { UnitStatus } from '../unit'
import { IActionResult, UnitAction } from './action'

export default class Heal extends UnitAction {
  name = 'Fire Breath'
  description = 'Ignite the air in a direction of a unit, causing ingent ' +
    'damage from burning'

  params = {
    damage: 5,
  }

  performAction(target: Hex) {
    const result: IActionResult = { targets: [] }

    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      result.targets!.push({
        unitId: targetUnit.id,
        damage: this.params.damage,
        status: { status: UnitStatus.Burning, exp: 5 },
      })
    }

    return result
  }

  targets() {
    return this.unit.pos.neighbors.filter(this.game.map.isIn)
  }
}
