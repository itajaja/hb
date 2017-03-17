import Hex, { directions } from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

export default class Fireball extends UnitAction {
  name = 'Fireball'
  description = 'Cast a mighty fire ball that causes area damage over 7 ' +
  'cells. It can be placed only on visible cells liying on straight ' +
  'lines from the caster'

  params = {
    damage: 3,
    area: 1,
  }
  range = 6

  performAction(target) {
    this.game.map.thingsInRange(target, this.params.area).forEach(t => {
      if (t instanceof Unit) {
        t.takeDamage(this.params.damage)
      }
    })

    return {}
  }

  targets() {
    const targets: Hex[] = []
    const { pos } = this.unit

    for (let dir = 0; dir < directions.length; dir++) {
      let target = pos.neighbor(dir)
      while (this.game.map.isIn(target) && target.distance(pos) < this.range) {
        targets.push(target)
        if (this.game.map.cellAt(target).thing) {
          break
        }
        target = target.neighbor(dir)
      }
    }

    return targets
  }
}
