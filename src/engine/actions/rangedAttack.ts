import Hex from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

export default class RangedAttack extends UnitAction {
  name = 'Ranged Attack'
  description = 'Throw a ranged attack that reaches distant enemies'

  params = {
    damage: 2,
  }

  performAction(target: Hex) {
    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      targetUnit.takeDamage(this.params.damage)
    }

    return {}
  }

  targets() {
    const { pos } = this.unit
    return pos.range(4, 2)
      .filter(this.game.map.isIn)
  }
}
