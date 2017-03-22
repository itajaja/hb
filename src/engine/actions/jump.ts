import Hex from '../hex'
import { UnitAction } from './action'

export default class Teleport extends UnitAction {
  name = 'Jump'
  description = 'allows to jump after an obstacle'

  params: {}

  performAction(target: Hex) {
    this.game.moveThing(this.unit, target)
    this.unit.pos = target

    return {}
  }

  targets() {
    const { pos } = this.unit
    return pos.range(2, 1)
      .filter(this.game.map.isIn)
      .filter(h => this.unit.canWalkOn(this.game.map.cellAt(h)))
  }
}
