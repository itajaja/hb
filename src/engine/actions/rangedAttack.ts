import Hex from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

export default class RangedAttack extends UnitAction {
  name = 'Ranged Attack'
  description = 'Throw a ranged attack that reaches distant enemies'

  damage = 2

  execute(target: Hex) {
    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      targetUnit.takeDamage(this.damage)
    }

    return {}
  }

  targets() {
    const { pos } = this.unit
    return [...pos.circle(2), ...pos.circle(3), ...pos.circle(4)]
      .filter(this.game.map.isIn)
  }
}
