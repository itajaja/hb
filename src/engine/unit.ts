import { UnitAction } from './actions/action'
import Game from './game'
import Hex from './hex'
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
  Dead,
  Confused,
  Poisoned,
}

export interface IUnitType {
  name: string
  description: string

  hp: number
  mp: number

  actions: Array<typeof UnitAction>,
}

export default class Unit extends Thing {
  kind = 'UNIT'

  type: IUnitType

  factionId: string

  game: Game

  hp: number
  mp: number

  moved = false

  state: UnitState
  stateExpiration: number

  actions: UnitAction[]

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

  takeDamage(damage: number) {
    if (this.state === UnitState.Guard) {
      damage--
    }

    this.hp = Math.min(this.hp - Math.max(damage, 0), this.type.hp)

    if (this.hp <= 0) {
      // dead, remove unit
      this.game.removeThing(this)
    }
  }

  move(to: Hex) {
    this.game.moveThing(this, to)
    this.pos = to
  }

  alterState(state: UnitState, exp: number) {
    this.state = state
    this.stateExpiration = exp
  }

  /**
   * reset the unit state before the turn begins
   */
  tickTurn() {
    this.moved = false
    if (this.state === UnitState.Normal) {
      return
    }

    // TODO apply state

    this.stateExpiration--

    if (this.stateExpiration === 0) {
      this.state = UnitState.Normal
    }
  }
}
