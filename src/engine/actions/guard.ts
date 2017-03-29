import { UnitStatus } from '../unit'
import { UnitAction } from './action'

export default class Guard extends UnitAction {
  name = 'Guard'
  description = 'put the unit in defensive position to absorb enemy attacks'

  performAction() {
    this.unit.alterState(UnitStatus.Guard, 1)

    return {}
  }

  targets() {
    return [this.unit.pos]
  }
}
