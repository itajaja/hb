import * as actions from '../engine/actions'
import Hex from '../engine/hex'
import { IMap } from '../engine/map'
import Unit from '../engine/unit'
import OpponentAi from './opponentAi'

interface IUnitAi {
  findPath(unit: Unit, map: IMap, ai: OpponentAi): Hex[]

  getAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null

  getLastAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null
}

const warriorAi: IUnitAi = {
  findPath(unit: Unit, map: IMap, ai: OpponentAi): Hex[] {
    // find nearest unit
    const [, , path] = map.flood(
      unit.pos,
      ai.isCellNearOpponentUnit,
      unit.canWalkOn,
    ).found! // asserting that fund is not null should be OK

    return path
  },

  getAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    const action = unit.getAction(actions.MeleeAttack)
    const targets = action.targets().map(map.cellAt)
    const target = targets.find(ai.hasCellOpponentUnit)

    if (!target) {
      return null
    }

    return () => action.execute(target.pos)
  },

  getLastAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    return () => unit.getAction(actions.Guard).execute(unit.pos)
  },
}

const archerAi: IUnitAi = {
  findPath(unit: Unit, map: IMap, ai: OpponentAi): Hex[] {
    return []
  },

  getAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    return null
  },

  getLastAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    return null
  },
}

const mageAi: IUnitAi = {
  findPath(unit: Unit, map: IMap, ai: OpponentAi): Hex[] {
    return []
  },

  getAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    return null
  },

  getLastAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    return null
  },
}

export default {
  Warrior: warriorAi,
  Archer: archerAi,
  Mage: mageAi,
} as {[idx: string]: IUnitAi}
