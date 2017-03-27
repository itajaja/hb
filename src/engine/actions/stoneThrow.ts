import Hex from '../hex'
import Unit from '../unit'
import { UnitAction } from './action'

interface IParams {
  damage: number
  area: number
}

export default class RangedAttack extends UnitAction {
  name = 'Stone Throw'
  description = 'Throw a massive stone, causing area damage'

  params: IParams

  async hitCenter(target: Hex) {
    const hits = this.game.map.thingsInRange(target, this.params.area, 1)
    await Promise.all(hits.map(async t => {
      if (t instanceof Unit) {
        await t.takeDamage(1)
      }
    }))
  }

  async hitArea(target: Hex) {
    const targetUnit = this.game.map.cellAt(target).thing

    if (targetUnit instanceof Unit) {
      await targetUnit.takeDamage(this.params.damage)
    }
  }

  async performAction(target: Hex) {
    await Promise.all([this.hitCenter(target), this.hitArea(target)])

    return {}
  }

  targets() {
    const { pos } = this.unit
    return pos.range(7, 2)
      .filter(this.game.map.isIn)
  }
}

export function stoneThrow(params: IParams) {
  return class extends RangedAttack {
    params = params
  }
}
