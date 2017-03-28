import Hex from '../hex'
import Unit, { UnitState } from '../unit'
import { UnitAction } from './action'

export default class Heal extends UnitAction {
  name = 'Web'
  description = 'Launch a sticky web towards a target, temporarily slowing ' +
    'down'

  params = {
    damage: 1,
  }

  async performAction(target: Hex) {
    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      await Promise.all([
        targetUnit.takeDamage(this.params.damage),
        targetUnit.alterState(UnitState.Slowed, 5),
      ])
    }

    return {}
  }

  targets() {
    const { pos } = this.unit
    return pos.range(5, 1)
      .filter(this.game.map.isIn)
  }
}
