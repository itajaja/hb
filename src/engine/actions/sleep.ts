import Hex from '../hex'
import Unit, { UnitState } from '../unit'
import { UnitAction } from './action'

export default class Sleep extends UnitAction {
  name = 'Sleep'
  description = 'puts a unit into an altered state in which he is unable ' +
    'to perform any action'

  params: {}
  manaCost = 2

  performAction(target: Hex) {
    const targetUnit = this.game.map.cellAt(target).thing
    if (targetUnit instanceof Unit) {
      targetUnit.alterState(UnitState.Sleeping, 2)
    }

    return {}
  }

  targets() {
    const { pos } = this.unit
    return pos.range(6, 1)
      .filter(this.game.map.isIn)
  }
}
