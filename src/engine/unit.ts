import { IAction } from './actions/action'
import Hex from './hex'
import Thing from './thing'

interface IUnitConfig {
  id: string
  factionId: string
  pos: Hex
  type: IUnitType
}

export enum UnitState {
  Normal,
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

  actions: Array<IAction<{}>>,
}

export default class Unit extends Thing {
  kind = 'UNIT'

  type: IUnitType

  factionId: string

  hp: number
  mp: number

  state: UnitState

  constructor({ pos, factionId, type }: IUnitConfig) {
    super()
    this.pos = pos
    this.factionId = factionId
    this.type = type
    this.hp = type.hp
    this.mp = type.mp
  }
}
