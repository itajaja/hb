import gid from './gid'
import Hex from './hex'

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
  id = gid()

  pos: Hex
}
