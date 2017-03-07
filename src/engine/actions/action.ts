import Game from '../game'
import Unit from '../unit'

// tslint:disable-next-line:no-empty-interface
interface IActionResult {
}

/**
 * Generic Action interface.
 * T is the type of the parameters passed to execution method
 */
export interface IAction<T> {
  name: string
  description: string

  game: Game

  execute(params: T): IActionResult
}

export type IUnitAction<T> = IAction<T & { self: Unit }>
