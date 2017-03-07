import IFaction from './faction'
import { IMap } from './map'
import { IThing } from './thing'

interface IGameConfig {
  factions: IFaction[]
  map: IMap
}

/**
 * Main Game class. The class has to purposes
 * - holding the game state
 * - managing the game loop
 */
export default class Game {
  turn = 0

  factions: {[id: string]: IFaction } = {}
  things: {[id: string]: IThing } = {}

  map: IMap

  currentFaction: IFaction

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
}
