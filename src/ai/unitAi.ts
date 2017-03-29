import { IActionResult, UnitAction } from '../engine/actions/action'
import Hex from '../engine/hex'
import { IMap } from '../engine/map'
import Unit, { UnitStatus } from '../engine/unit'
import OpponentAi from './opponentAi'

interface IActionScore {
  score: number,
  action?: UnitAction,
  target?: Hex,
}

const STATUS_SCORE = {
  [UnitStatus.Guard]: -.2,
  [UnitStatus.Sleeping]: .2,
  [UnitStatus.Burning]: .2,
  [UnitStatus.Slowed]: .2,
}

export default class UnitAi {
  constructor(
    protected unit: Unit,
    protected map: IMap,
    protected ai: OpponentAi,
  ) { }

  findPathTowardsEnemy() {
    // find nearest unit
    const found = this.map.flood(
      this.unit.pos,
      this.ai.isCellNearEnemyUnit,
      this.unit.canWalkOn,
    ).found

    if (found) {
      const [, , path] = found
      return path
    }

    return []
  }

  findPath(): Hex[] {
    return this.findPathTowardsEnemy()
  }

  rankAction(result: IActionResult): number {
    let score = 0
    result.targets.forEach(t => {
      const targetUnit = this.unit.game.things.get(t.unitId) as Unit
      const isAlly = targetUnit.factionId === this.unit.factionId
      if (t.damage) {
        let damageScore = t.damage / targetUnit.hp
        damageScore *= isAlly ? -1 : 1
        score += damageScore
      }
      if (t.newPosition) {
        score += .1 // just because why not
      }
      if (t.status) {
        let statusScore = STATUS_SCORE[t.status.status]
        statusScore *= isAlly ? -1 : 1
        score += statusScore
      }
    })

    return score
  }

  getAction(): (() => Promise<any>) | null {
    let bestAction: IActionScore = {
      score: 0,
    }

    for (const action of this.unit.actions) {
      for (const target of action.targets()) {
        const score = this.rankAction(action.performAction(target))
        if (score > bestAction.score) {
          bestAction = { score, action, target }
        }
      }
    }

    if (bestAction.action) {
      return () => bestAction.action!.execute(bestAction.target!)
    }

    return null
  }

  getLastAction(): (() => Promise<any>) | null {
    // XXX consider removing this
    return this.getAction()
  }
}
