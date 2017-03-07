import { UnitAction } from './actions/action'
import Game from './game'
import Hex from './hex'
import Thing from './thing'

interface IUnitConfig {
  factionId: string
  game: Game
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

  state: UnitState
  stateExpiration: number

  constructor({ pos, factionId, type, game }: IUnitConfig) {
    super()
    this.pos = pos
    this.factionId = factionId
    this.type = type
    this.hp = type.hp
    this.mp = type.mp
    this.game = game
  }

  takeDamage(damage: number) {
    if (this.state === UnitState.Guard) {
      damage--
    }

    this.hp = Math.min(this.hp - Math.max(damage, 0), this.type.hp)

    if (this.hp <= 0) {
      // dead, remove unit
      this.game.map.cellAt(this.pos).thing
    }
  }

  move(hex: Hex) {
    delete this.game.map.cellAt(this.pos).thing
    this.pos = hex
    this.game.map.cellAt(this.pos).thing = this
  }

  alterState(state: UnitState, exp: number) {
    this.state = state
    this.stateExpiration = exp
  }

  tickState() {
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
