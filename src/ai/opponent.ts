// import Game from '../engine/game'
import Unit from '../engine/unit'
import Store from '../ui/stageView/store'
import { debug, intervalForeach, pickRandom } from '../utils'

/**
 * the main strategy for the opponent is to move each unit, and if possible
 * execute an action
 */
export default class Opponent {
  constructor(private store: Store) { }

  moveUnit = (unit: Unit) => {
    debug('moving unit', unit.type.name, unit.id)
    const moveTargets = unit.moveTargets()
    if (moveTargets.length) {
      unit.move(pickRandom(moveTargets))
    }

    // update state
    this.store.set({})
  }

  async performTurn() {
    const { game } = this.store.state
    const { id } = this.store.state.game.currenFaction
    debug('perform AI turn for faction', id)
    const units = game.factionUnits[id]
    await intervalForeach(units, this.moveUnit, 1000)

    this.store.endTurn()
  }
}
