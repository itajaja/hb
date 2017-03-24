import Hex from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

interface IParams {
  damage: number
}

export default class MeleeAttack extends UnitAction {
  name = 'Melee Attack'
  description = 'deals damage to adjacent unit'

  params: IParams

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

export function meleeAttack(params: IParams) {
  return class extends MeleeAttack {
    params = params
  }
}
