import Hex from '../hex'
import Unit from '../unit'
import { IActionResult, UnitAction } from './action'

interface IParams {
  damage: number
  range: [number, number]
}

export default class RangedAttack extends UnitAction {
  name = 'Ranged Attack'
  description = 'Throw a ranged attack that reaches distant enemies'

  params: IParams

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
    const { pos } = this.unit
    const [maxRange, minRange] = this.params.range
    return pos.range(maxRange, minRange)
      .filter(this.game.map.isIn)
  }
}

export function rangedAttack(params: IParams) {
  return class extends RangedAttack {
    params = params
  }
}
