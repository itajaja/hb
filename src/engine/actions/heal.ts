import Hex from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

export default class Heal extends UnitAction {
  name = 'Heal'
  description = 'Heal part of an adjacent unit\'s life back'

  params = {
    damage: -3,
  }
  manaCost = 1

  async performAction(target: Hex) {
    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      await targetUnit.takeDamage(this.params.damage)
    }

    return {}
  }

  targets() {
    return this.unit.pos.neighbors.filter(this.game.map.isIn)
  }
}
