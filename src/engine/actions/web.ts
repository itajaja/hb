import Hex from '../hex'
import Unit, { UnitStatus } from '../unit'
import { IActionResult, UnitAction } from './action'

export default class Heal extends UnitAction {
  name = 'Web'
  description = 'Launch a sticky web towards a target, temporarily slowing ' +
    'down'

  params = {
    damage: 1,
  }

  performAction(target: Hex) {
    const result: IActionResult = { targets: [] }

    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      result.targets!.push({
        unitId: targetUnit.id,
        damage: this.params.damage,
        status: { status: UnitStatus.Slowed, exp: 5 },
      })
    }

    return result
  }

  targets() {
    const { pos } = this.unit
    return pos.range(5, 1)
      .filter(this.game.map.isIn)
  }
}
