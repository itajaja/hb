import Hex from '../hex'
import Unit from '../unit'
import { IActionResult, UnitAction } from './action'

interface IParams {
  damage: number
  area: number
  range: [number, number]
}

export default class StoneThrow extends UnitAction {
  name = 'Stone Throw'
  description = 'Throw a massive stone, causing area damage'

  params: IParams

  performAction(target: Hex) {
    const result: IActionResult = { targets: [] }

    const targetUnit = this.game.map.cellAt(target).thing

    if (targetUnit instanceof Unit) {
      result.targets!.push({
        unitId: targetUnit.id, damage: this.params.damage,
      })
    }

    const areaHits = this.game.map.thingsInRange(target, this.params.area, 1)
      .filter(t => t instanceof Unit) as Unit[]

    result.targets = result.targets.concat(areaHits.map(t => ({
      unitId: t.id, damage: 1,
    })))

    return result
  }

  targets() {
    const { pos } = this.unit
    const [maxRange, minRange] = this.params.range
    return pos.range(maxRange, minRange)
      .filter(this.game.map.isIn)
  }
}

export function stoneThrow(params: IParams) {
  return class extends StoneThrow {
    params = params
  }
}
