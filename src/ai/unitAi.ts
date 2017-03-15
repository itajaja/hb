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
    const found = map.flood(
      unit.pos,
      ai.isCellNearEnemyUnit,
      unit.canWalkOn,
    ).found

    if (found) {
      const [, , path] = found
      return path
    }

    return []
  },

  getAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    const action = unit.getAction(actions.MeleeAttack)
    const targets = action.targets().map(map.cellAt)
    const target = targets.find(ai.hasCellEnemyUnit)

    return target ? () => action.execute(target.pos) : null
  },

  getLastAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    return () => unit.getAction(actions.Guard).execute(unit.pos)
  },
}

const archerAi: IUnitAi = {
  findPath(unit: Unit, map: IMap, ai: OpponentAi): Hex[] {
    // find nearest unit
    const found = map.flood(
      unit.pos,
      ai.isCellNearEnemyUnit,
      unit.canWalkOn,
    ).found

    if (found) {
      const [, , path] = found
      return path
    }

    return []
  },

  // try to range attack
  getAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    const action = unit.getAction(actions.RangedAttack)
    const targets = action.targets().map(map.cellAt)
    const target = targets.find(ai.hasCellEnemyUnit)

    return target ? () => action.execute(target.pos) : null
  },

  // try to melee attack
  getLastAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    const action = unit.getAction(actions.MeleeAttack)
    const targets = action.targets().map(map.cellAt)
    const target = targets.find(ai.hasCellEnemyUnit)

    return target ? () => action.execute(target.pos) : null
  },
}

const mageAi: IUnitAi = {
  findPath(unit: Unit, map: IMap, ai: OpponentAi): Hex[] {
    // find nearest unit
    const found = map.flood(
      unit.pos,
      ai.isCellNearEnemyUnit,
      unit.canWalkOn,
    ).found

    if (found) {
      const [, , path] = found
      return path
    }

    return []
  },

  // try to heal. if you cannot heal attack. do fireball only if you are not
  // in the deflagration area, otherwise melee
  getAction(unit: Unit, map: IMap, ai: OpponentAi): (() => void) | null {
    const hAction = unit.getAction(actions.Heal)
    const hTargets = hAction.targets().map(map.cellAt)
    // a friendly unit with not max hp
    const hTarget = hTargets.find(c => (
      ai.hasCellFriendlyUnit(c)
      && (c.thing as Unit).hp < (c.thing as Unit).type.hp
    ))

    if (hTarget) {
      return () => hAction.execute(hTarget.pos)
    }

    const fAction = unit.getAction(actions.Fireball)
    const fTargets = fAction.targets().map(map.cellAt)
    // an enemy unit not too close
    const fTarget = fTargets.find(c => (
      ai.hasCellEnemyUnit(c) && !unit.pos.isNeighbor(c.pos)
    ))

    if (fTarget) {
      return () => fAction.execute(fTarget.pos)
    }

    const mAction = unit.getAction(actions.MeleeAttack)
    const mTargets = mAction.targets().map(map.cellAt)
    const mTarget = mTargets.find(ai.hasCellEnemyUnit)

    return mTarget ? () => mAction.execute(mTarget.pos) : null
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
