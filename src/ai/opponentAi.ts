import { ICell } from '../engine/map'
import Unit from '../engine/unit'
import Store from '../ui/stageView/store'
import { debug, intervalForeach } from '../utils'
import unitAis from './unitAi'

/**
 * the main strategy for the opponent is to move each unit, and if possible
 * execute an action
 */
export default class OpponentAi {
  constructor(private store: Store) { }

  hasCellFriendlyUnit = (c: ICell) => {
    return c.thing && c.thing instanceof Unit
      ? c.thing.factionId === this.store.state.game.currenFaction.id
      : false
  }

  hasCellEnemyUnit = (c: ICell) => {
    return c.thing && c.thing instanceof Unit
      ? c.thing.factionId === this.store.state.playerFaction
      : false
  }

  update() {
    this.store.set({}) // update state
    if (this.store.state.game.checkGameOver()) {
      throw 'GAME_OVER' // tslint:disable-line:no-string-throw
    }
  }

  isCellNearEnemyUnit = (c: ICell): boolean => {
    const { map } = this.store.state.game
    return c.pos.neighbors.filter(map.isIn).map(map.cellAt)
      .some(this.hasCellEnemyUnit)
  }

  tryExecuteUnitAction(unit: Unit, action: (() => void) | null) {
    this.update()
    if (action && unit.canPerformAction) {
      action()
    }
    this.update()
  }

  moveUnit = (unit: Unit) => {
    debug('ai: moving unit', unit)
    const { game } = this.store.state
    const unitAi = unitAis[unit.type.name]

    this.tryExecuteUnitAction(unit, unitAi.getAction(unit, game.map, this))

    for (const p of unitAi.findPath(unit, game.map, this)) {
      // we have to recompute the move targets every cycle because stuff
      // could have happened after performing the action
      const moveTargets = unit.moveTargets()

      if (!(moveTargets.some(h => h.toString() === p.toString()))) {
        debug('ai: reached final position', p)
        break
      }
      unit.move(p)

      this.tryExecuteUnitAction(unit, unitAi.getAction(unit, game.map, this))
    }

    this.tryExecuteUnitAction(unit, unitAi.getLastAction(unit, game.map, this))

    this.update()
  }

  async performTurn() {
    try {
      const { game } = this.store.state
      const { id } = this.store.state.game.currenFaction
      debug('ai: perform turn for faction', id)
      const units = game.factionUnits[id]
      await intervalForeach(units, this.moveUnit, 1000)

      this.store.endTurn()
    } catch (e) {
      if (e === 'GAME_OVER') {
        // pass
      }
      throw e
    }
  }
}
