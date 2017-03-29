import { getItemCircular } from '../../utils'
import Hex, { directions } from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

interface IParams {
  damage: number
}

export default class TwoHandedSwordAttack extends UnitAction {
  name = 'Two Handed Sword Attack'
  description = 'deals damage to three adjacent units at once'

  params: IParams

  performAction(target: Hex) {
    const targetDir = this.unit.pos.getNeighborDirection(target)

    const hits = [
      target,
      this.unit.pos.add(getItemCircular(directions, targetDir + 1)),
      this.unit.pos.add(getItemCircular(directions, targetDir - 1)),
    ].filter(this.game.map.isIn)
      .map(t => this.game.map.cellAt(t).thing)
      .filter(t => t instanceof Unit) as Unit[]


    return {
      targets: hits.map(t => ({ unitId: t.id, damage: this.params.damage })),
    }
  }

  targets() {
    return this.unit.pos.neighbors.filter(this.game.map.isIn)
  }
}

export function twoHandedSwordAttack(params: IParams) {
  return class extends TwoHandedSwordAttack {
    params = params
  }
}
