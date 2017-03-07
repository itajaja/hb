import assert from './assert'
import Hex, { CENTER } from './hex'
import IThing from './thing'

export enum Terrain {
  Ground,
  Water,
  Wall,
  Weeds,
  Pit,
}

export interface ICell {
  pos: Hex
  thing?: IThing
  terrain: Terrain
}

export interface IMap {
  isIn: (hex: Hex) => boolean

  cellAt: (hex: Hex) => ICell | null

  cells: ICell[]
}

/**
 * An hexagonal map of the specified radius and the central cell at [0, 0]
 */
export default class HexMap implements IMap {
  size: number

  // cells indexed by string 'q,s'
  private _cells: { [idx: string]: ICell } = {}

  constructor(size: number, cells: ICell[]) {
    this.size = size

    cells.forEach(c => {
      const idx = c.pos.toString()
      assert(this.isIn(c.pos), 'Cell out of map boundaries')
      assert(!this._cells[idx], 'Cell already assigned')
      this._cells[idx] = c
    })
  }

  isIn(hex: Hex) {
    return hex.distance(CENTER) <= this.size
  }

  cellAt(hex: Hex) {
    if (!this.isIn(hex)) {
      return null
    }
    const idx = hex.toString()
    const cell = this._cells[idx]

    if (cell) {
      return cell
    }

    const defaultCell = { pos: hex, terrain: Terrain.Ground }
    this._cells[idx] = defaultCell
    return defaultCell
  }

  get cells() {
    // we can safely cast here because we know we are inside the boundaries
    return CENTER.range(this.size).map(this.cellAt) as ICell[]
  }
}
