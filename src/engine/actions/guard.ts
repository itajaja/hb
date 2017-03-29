import { UnitStatus } from '../unit'
import { UnitAction } from './action'

export default class Guard extends UnitAction {
  name = 'Guard'
  description = 'put the unit in defensive position to absorb enemy attacks'

  performAction() {
    return {
      targets: [{
        unitId: this.unit.id,
        status: { status: UnitStatus.Guard, exp: 1 },
      }],
    }
  }

  targets() {
    return [this.unit.pos]
  }
}
