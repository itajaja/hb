import Hex from '../hex'
import { UnitAction } from './action'

export default class Jump extends UnitAction {
  name = 'Jump'
  description = 'Jump over an obstacle or a pit'

  params: {}

  performAction(target: Hex) {
    return {
      targets: [{
        unitId: this.unit.id, newPosition: target,
      }],
    }
  }

  targets() {
    const { pos } = this.unit
    return pos.range(2, 1)
      .filter(this.game.map.isIn)
      .filter(h => this.unit.canWalkOn(this.game.map.cellAt(h)))
  }
}
