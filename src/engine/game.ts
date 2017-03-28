import { debug } from '../utils'
import assert from './assert'
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

  private subs: {[idx: string]: Array<(payload) => Promise<void>>} = {}

  constructor({ factions, map }: IGameConfig) {
    this.map = map

    factions.forEach(f => this.factions.set(f.id, f))
    map.cells.forEach(({ thing }) => {
      if (thing) {
        this.things.set(thing.id, thing)
      }
    })
  }

  get currenFaction(): Faction {
    return Array.from(this.factions.values())[this.currentFactionIndex]
  }

  get factionUnits(): {[idx: string]: Unit[]} {
    const units: {[idx: string]: Unit[]} = {}

    this.factions.forEach(f => units[f.id] = [])
    this.things.forEach(t => {
      if (t instanceof Unit) {
        units[t.factionId].push(t)
      }
    })

    return units
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

  /**
   * returns the id of the winning faction, if there is one
   */
  checkGameOver(): string | undefined {
    const factionUnits = this.factionUnits

    // checks if there are some factions with 0 units
    let winningFaction: string | undefined
    for (const factionId of Object.keys(factionUnits)) {
      if (factionUnits[factionId].length > 0) {
        if (winningFaction) {
          return // there is no winner yet
        }
        winningFaction = factionId
      }
    }

    return winningFaction
  }

  finishEpoch() {
    // do something to update the state globally
  }

  async prepareFactionTurn(faction: Faction) {
    const things = Array.from(this.things.values())
    for (const thing of things) {
      if (thing instanceof Unit && thing.factionId === faction.id) {
        await thing.tickTurn()
      }
    }
  }

  async endTurn() {
    this.currentFactionIndex++
    if (this.currentFactionIndex === this.factions.size) {
      this.finishEpoch()

      this.currentFactionIndex = 0
      this.epoch++
    }

    await this.prepareFactionTurn(this.currenFaction)
  }

  // event handling
  async emit(eventName: string, payload) {
    debug('game: emitting event', eventName, payload)
    const subs = this.subs[eventName] || []
    await Promise.all(subs.map(cb => cb(payload)))
  }

  listen(eventName: string, cb: (payload) => Promise<void>) {
    this.subs[eventName] = this.subs[eventName] || []
    this.subs[eventName].push(cb)

    return () => {
      const index = this.subs[eventName].indexOf(cb)
      assert(index >= 0, 'the listener should be there')
      this.subs[eventName].splice(index, 1)
    }
  }
}
