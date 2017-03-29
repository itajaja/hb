import Hex from '../hex'
import Unit, { UnitStatus } from '../unit'
import { IActionResult, UnitAction } from './action'

export default class Sleep extends UnitAction {
  name = 'Sleep'
  description = 'puts a unit into an altered state in which he is unable ' +
    'to perform any action'

  params: {}
  manaCost = 2

  performAction(target: Hex) {
    const result: IActionResult = { targets: [] }

    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      result.targets!.push({
        unitId: targetUnit.id,
        status: { status: UnitStatus.Sleeping, exp: 1 },
      })
    }

    return result
  }

  targets() {
    const { pos } = this.unit
    return pos.range(6, 1).filter(this.game.map.isIn)
  }
}
