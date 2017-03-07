import Hex from './hex'

let GID = 0

/**
 * Represents anything that can be placed on the map
 */
export interface IThing {
  /**
   * Describe the class of thing at runtime
   */
  kind: string
  /**
   * A global ID for the thing
   */
  id: string

  pos: Hex
}

export default class Thing implements IThing {
  kind: string
  id: string

  pos: Hex

  constructor() {
    this.id = (++GID).toString()
  }
}
