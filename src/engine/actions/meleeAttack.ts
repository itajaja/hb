import Hex from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

export default class MeleeAttack extends UnitAction {
  name = 'Melee Attack'
  description = 'deals damage to adjacent unit'

  params = {
    damage: 3,
  }

  performAction(target: Hex) {
    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      targetUnit.takeDamage(this.params.damage)
    }

    return {}
  }

  targets() {
    return this.unit.pos.neighbors.filter(this.game.map.isIn)
  }
}
