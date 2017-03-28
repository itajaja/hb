import Hex from '../hex'
import Unit, { UnitState } from '../unit'
import { UnitAction } from './action'

export default class Heal extends UnitAction {
  name = 'Fire Breath'
  description = 'Ignite the air in a direction of a unit, causing ingent ' +
    'damage from burning'

  params = {
    damage: 5,
  }

  async performAction(target: Hex) {
    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      await Promise.all([
        targetUnit.takeDamage(this.params.damage),
        targetUnit.alterState(UnitState.Burning, 5),
      ])
    }

    return {}
  }

  targets() {
    return this.unit.pos.neighbors.filter(this.game.map.isIn)
  }
}
