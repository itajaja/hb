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
  turn = 0

  factions: {[id: string]: Faction } = {}
  things: {[id: string]: IThing } = {}

  map: IMap

  currentFaction: Faction

  constructor({ factions, map }: IGameConfig) {
    this.map = map

    factions.forEach(f => this.factions[f.id] = f)
    map.cells.forEach(({ thing }) => {
      if (thing) {
        this.things[thing.id] = thing
      }
    })

    this.currentFaction = factions[0]
  }

  addUnit(unitConfig: IUnitConfig) {
    const unit = new Unit(this, unitConfig)
    this.map.cellAt(unit.pos).thing = unit
    this.things[unit.id] = unit
  }

  removeThing(thing: IThing) {
    delete this.things[thing.id]
    delete this.map.cellAt(thing.pos).thing
  }

  moveThing(thing: IThing, to: Hex) {
    delete this.map.cellAt(thing.pos).thing
    this.map.cellAt(to).thing = thing
  }
}
