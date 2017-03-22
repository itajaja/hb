import Hex from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

interface IParams {
  damage: number
  area: number
}

export default class RangedAttack extends UnitAction {
  name = 'Stone Throw'
  description = 'Throw a massive stone, causing area damage'

  params: IParams

  performAction(target: Hex) {
    // target unit
    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      targetUnit.takeDamage(this.params.damage)
    }

    // area damage
    this.game.map.thingsInRange(target, this.params.area, 1).forEach(t => {
      if (t instanceof Unit) {
        t.takeDamage(1)
      }
    })

    return {}
  }

  targets() {
    const { pos } = this.unit
    return pos.range(7, 2)
      .filter(this.game.map.isIn)
  }
}

export function stoneThrow(params: IParams) {
  return class extends RangedAttack {
    params = params
  }
}
