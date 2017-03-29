import { UnitAction } from './actions/action'
import assert from './assert'
import Game from './game'
import Hex from './hex'
import { ICell, Terrain } from './map'
import Thing from './thing'
import { ITrait } from './units/traits'

export interface IUnitConfig {
  factionId: string
  pos: Hex
  type: IUnitType
}

export enum UnitStatus {
  Guard,
  Sleeping,
  Burning,
  Slowed,
}

export interface IUnitType {
  name: string
  description: string

  hp: number
  mp: number
  mana: number
  resistance: number

  actions: Array<typeof UnitAction>,

  cost: number

  traits?: ITrait[],
}

export default class Unit extends Thing {
  kind = 'UNIT'

  type: IUnitType

  factionId: string

  game: Game

  hp: number
  mp: number
  mana: number

  actionPerformed = false

  status = new Map<UnitStatus, number>()

  actions: UnitAction[]

  walkableTerrains = new Set([Terrain.Ground, Terrain.Water, Terrain.Forest])

  constructor(game: Game, { pos, factionId, type }: IUnitConfig) {
    super()
    this.pos = pos
    this.factionId = factionId
    this.type = type
    this.hp = type.hp
    this.mp = type.mp
    this.mana = type.mana
    this.game = game
    this.actions = type.actions.map(Action => new Action(game, this))

    if (type.traits) {
      type.traits.forEach(t => t.modify(this))
    }
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
      && !this.status.has(UnitStatus.Sleeping)
  }

  get resistance(): number {
    let modifier = 0
    if (this.status.has(UnitStatus.Guard)) {
      modifier++
    }
    return this.type.resistance + modifier
  }

  async takeDamage(damage: number) {
    if (damage === 0) {
      return
    }
    // heal
    if (damage < 0) {
      const heal = -damage
      this.hp = Math.min(this.type.hp, this.hp + heal)
      return
    }

    // damage
    await this.game.emit('unit:takeDamage', this)
    damage -= this.resistance

    this.hp = Math.max(this.hp - damage, 0)

    if (this.hp <= 0) {
      // dead, remove unit
      this.game.removeThing(this)
    }
  }

  async move(to: Hex) {
    const from = this.pos
    this.game.moveThing(this, to)
    this.mp -= to.distance(this.pos)
    this.pos = to
    await this.game.emit('unit:move', { unit: this, from })
  }

  moveTargets(): Hex[] {
    if (this.mp <= 0 || !this.canPerformAction) {
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

    return this.walkableTerrains.has(cell.terrain)
  }

  alterStatus(state: UnitStatus, exp: number) {
    this.status.set(state, exp)
  }

  /**
   * reset the unit status before the turn begins
   */
  async tickTurn() {
    this.actionPerformed = false
    this.mp = this.type.mp

    const statuses = Array.from(this.status.entries())
    await Promise.all(statuses.map(async ([status, expiration]) => {
      switch (status) {
        // TODO the status handling should probably not live here but in the
        // single state modules
        case UnitStatus.Burning:
          await this.takeDamage(2)
          break
        case UnitStatus.Slowed:
          this.mp--
        default:
          break
      }

      if (expiration === 0) {
        this.status.delete(status)
      } else {
        this.status.set(status, expiration - 1)
      }
    }))

  }
}
