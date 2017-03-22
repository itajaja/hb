import Game from '../game'
import Hex from '../hex'
import Unit from '../unit'

// TODO Not sure how to use this
// tslint:disable-next-line:no-empty-interface
interface IActionResult {
}

/**
 * Generic Action interface.
 */
export interface IAction {
  name: string
  description: string

  game: Game

  execute(target: Hex): IActionResult

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

  execute(target: Hex): IActionResult {
    if (!this.canExecute) {
      return {} // TODO Should we be smarter here?
    }

    this.unit.actionPerformed = true
    this.unit.mp = 0
    this.unit.mana -= this.manaCost

    const result = this.performAction(target)
    this.game.emit('performAction', this)
    return result
  }

  targets(): Hex[] {
    throw Error('Not Implemented')
  }

  protected performAction(target: Hex): IActionResult {
    throw Error('Not Implemented')
  }
}
