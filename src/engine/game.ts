import Faction from './faction'
import Hex from './hex'
import { IMap } from './map'
import { IThing } from './thing'
import { default as Unit, IUnitConfig } from './unit'

interface IGameConfig {
  factions: Faction[]
  map: IMap
}

/**
 * Main Game class. The class has to purposes
 * - holding the game state
 * - managing the game loop
 */
export default class Game {
  epoch = 0
  currentFactionIndex = 0

  factions: Map<string, Faction> = new Map()
  things: Map<string, IThing> = new Map()

  map: IMap

  constructor({ factions, map }: IGameConfig) {
    this.map = map

    factions.forEach(f => this.factions.set(f.id, f))
    map.cells.forEach(({ thing }) => {
      if (thing) {
        this.things.set(thing.id, thing)
      }
    })
  }

  get currenFaction(): Faction{
    return Array.from(this.factions.values())[this.currentFactionIndex]
  }

  addUnit(unitConfig: IUnitConfig) {
    const unit = new Unit(this, unitConfig)
    this.map.cellAt(unit.pos).thing = unit
    this.things.set(unit.id, unit)
  }

  removeThing(thing: IThing) {
    this.things.delete(thing.id)
    delete this.map.cellAt(thing.pos).thing
  }

  moveThing(thing: IThing, to: Hex) {
    delete this.map.cellAt(thing.pos).thing
    this.map.cellAt(to).thing = thing
  }

  finishEpoch() {
    // do something to update the state globally
  }

  prepareFactionTurn(faction: Faction) {
    this.things.forEach(t => {
      if (t instanceof Unit && t.factionId === faction.id) {
        t.tickTurn()
      }
    })
  }

  endTurn() {
    this.currentFactionIndex++
    if (this.currentFactionIndex === this.factions.size) {
      this.finishEpoch()

      this.currentFactionIndex = 0
      this.epoch++
    }

    this.prepareFactionTurn(this.currenFaction)
  }
}
