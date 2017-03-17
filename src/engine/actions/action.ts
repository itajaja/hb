import Game from '../game'
import Hex from '../hex'
import Unit from '../unit'

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

  constructor(public game: Game, public unit: Unit) {}

  execute(target: Hex): IActionResult {
    this.unit.actionPerformed = true
    this.unit.mp = 0

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
