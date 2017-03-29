import Game from '../game'
import Hex from '../hex'
import Unit, { UnitStatus } from '../unit'

export interface IActionResult {
  targets: Array<{
    unitId: string,
    damage?: number,
    status?: { status: UnitStatus, exp: number },
    newPosition?: Hex,
  }>
}

/**
 * Generic Action interface.
 */
export interface IAction {
  name: string
  description: string

  game: Game

  execute(target: Hex): Promise<void>

  targets(): Hex[]
}

export class UnitAction implements IAction {
  name: string
  description: string

  params: any = {}

  manaCost: number = 0

  constructor(public game: Game, public unit: Unit) { }

  get isAvailable() {
    return this.unit.mana >= this.manaCost
  }

  get canExecute() {
    return this.isAvailable && this.unit.canPerformAction
  }

  async execute(target: Hex) {
    if (!this.canExecute) {
      return
    }

    this.unit.actionPerformed = true
    this.unit.mp = 0
    this.unit.mana -= this.manaCost

    await this.game.emit('action:perform', this)
    const result = this.performAction(target)
    await Promise.all(result.targets.map(async t => {
      const targetUnit = this.game.things.get(t.unitId) as Unit
      if (t.damage) {
        await targetUnit.takeDamage(t.damage)
      }
      if (t.status) {
        await targetUnit.alterStatus(t.status.status, t.status.exp)
      }
      if (t.newPosition) {
        this.game.moveThing(targetUnit, t.newPosition)
        targetUnit.pos = t.newPosition
      }
    }))
  }

  targets(): Hex[] {
    throw Error('Not Implemented')
  }

  protected performAction(target: Hex): IActionResult {
    throw Error('Not Implemented')
  }
}
