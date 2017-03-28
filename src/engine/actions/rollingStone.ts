import Hex, { directions } from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

export default class RollingStone extends UnitAction {
  name = 'Rolling Stone'
  description = 'Hit several units in a straight line'

  params = {
    damage: 3,
  }

  async performAction(target: Hex) {
    let vector = target.sub(this.unit.pos)
    vector = new Hex(Math.sign(vector.q), Math.sign(vector.r))

    const hits: Unit[] = []
    for (let x = 0; x < 4; x++) {
      if (!this.game.map.isIn(target)) {
        break
      }
      const targetUnit = this.game.map.cellAt(target).thing
      if (targetUnit instanceof Unit) {
        hits.push(targetUnit)
      }

      target = target.add(vector)
    }

    await Promise.all(hits.map(t => t.takeDamage(this.params.damage)))

    return {}
  }

  targets() {
    const targets: Hex[] = []
    const { pos } = this.unit

    for (let dir = 0; dir < directions.length; dir++) {
      let target = pos.neighbor(dir)
      while (this.game.map.isIn(target) && target.distance(pos) < 6) {
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
