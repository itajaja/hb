import { UnitAction } from './actions/action'
import assert from './assert'
import Game from './game'
import Hex from './hex'
import { ICell, Terrain } from './map'
import Thing from './thing'

export interface IUnitConfig {
  factionId: string
  pos: Hex
  type: IUnitType
}

export enum UnitState {
  Normal,
  Guard,
  Sleeping,
  Confused,
  Poisoned,
}

export interface IUnitType {
  name: string
  description: string

  hp: number
  mp: number

  actions: Array<typeof UnitAction>,

  cost: number,
}

export default class Unit extends Thing {
  kind = 'UNIT'

  type: IUnitType

  factionId: string

  game: Game

  hp: number
  mp: number

  actionPerformed = false

  state: UnitState = UnitState.Normal
  stateExpiration: number

  actions: UnitAction[]

  walkableTerrains = [Terrain.Ground, Terrain.Water, Terrain.Forest]

  constructor(game: Game, { pos, factionId, type }: IUnitConfig) {
    super()
    this.pos = pos
    this.factionId = factionId
    this.type = type
    this.hp = type.hp
    this.mp = type.mp
    this.game = game
    this.actions = type.actions.map(Action => new Action(game, this))
  }

  getAction(actionType: typeof UnitAction): UnitAction {
    const action = this.actions.find(a => a instanceof actionType)

    assert(action, 'Action not found')
    return action!
  }

  get faction() {
    return this.game.factions.get(this.factionId)!
  }

  get canPerformAction(): boolean {
    return !this.actionPerformed
      && this.state !== UnitState.Confused
      && this.state !== UnitState.Sleeping
  }

  takeDamage(damage: number) {
    if (damage === 0) {
      return
    }
    // heal
    if (damage < 0) {
      const heal = -damage
      this.hp = Math.min(this.type.hp, this.hp + heal)
      return
    }
    this.game.emit('takeDamage', this)
    // damage
    if (this.state === UnitState.Guard) {
      damage--
    }

    this.hp = Math.max(this.hp - damage, 0)

    if (this.hp <= 0) {
      // dead, remove unit
      this.game.removeThing(this)
    }
  }

  move(to: Hex) {
    this.game.moveThing(this, to)
    this.mp -= to.distance(this.pos)
    this.pos = to
  }

  moveTargets(): Hex[] {
    if (this.mp <= 0) {
      return []
    }

    return this.game.map.flood(
      this.pos,
      (_, d) => d > this.mp,
      this.canWalkOn,
    ).paths.map(([c]) => c.pos)
  }

  canWalkOn = (cell: ICell) => {
    if (cell.thing && cell.thing instanceof Unit) {
      return false
    }

    return this.walkableTerrains.lastIndexOf(cell.terrain) >= 0
  }

  alterState(state: UnitState, exp: number) {
    this.state = state
    this.stateExpiration = exp
  }

  /**
   * reset the unit state before the turn begins
   */
  tickTurn() {
    this.actionPerformed = false
    this.mp = this.type.mp

    if (this.state !== UnitState.Normal) {
      // TODO apply state

      this.stateExpiration--

      if (this.stateExpiration === 0) {
        this.state = UnitState.Normal
      }
    }
  }
}
