import assert from './assert'
import Hex, { CENTER } from './hex'
import IThing from './thing'

export enum Terrain {
  Ground,
  Water,
  Wall,
  Forest,
  Pit,
}

export interface ICell {
  pos: Hex
  thing?: IThing
  terrain: Terrain
}

interface IFloodResult {
  paths: Array<[ICell, number, Hex[]]>
  found?: [ICell, number, Hex[]]
}

export interface IMap {
  cells: ICell[]

  isIn(hex: Hex): boolean

  cellAt(hex: Hex): ICell

  thingsInRange(hex: Hex, radius: number, innerRadius?: number): IThing[]

  /**
   * returns the flooded paths
   * @param from the starting position
   * @param stop determines when to stop the flooding
   * @param predicate determines if a cell can be flooded
   */
  flood(
    from: Hex,
    stop: (cell: ICell, distance: number, path: Hex[]) => boolean,
    predicate: (cell: ICell) => boolean,
  ): IFloodResult
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

  isIn = (hex: Hex) => {
    return hex.distance(CENTER) <= this.size
  }

  cellAt = (hex: Hex): ICell => {
    assert(this.isIn(hex), 'Cell out of map boundaries')
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
    return CENTER.range(this.size).map(this.cellAt)
  }

  flood(
    from: Hex,
    stop: (cell: ICell, distance: number, path: Hex[]) => boolean,
    predicate: (cell: ICell) => boolean,
  ): IFloodResult {
    const bag = new Map<ICell, [ICell, number, Hex[]]>()
    const toProcess: Array<[Hex, number, Hex[]]> = [[from, 0, []]]

    while (toProcess.length > 0) {
      const [CurHex, distance, path] = toProcess.splice(0, 1)[0]
      const curCell = this.cellAt(CurHex)
      if (stop(curCell, distance + 1, path)) {
        return {
          paths: Array.from(bag.values()),
          found: [curCell, distance, path],
        }
      }
      const newCells = CurHex.neighbors
        .filter(this.isIn).map(this.cellAt).filter(predicate)

      newCells.forEach(c => {
        if (bag.has(c)) {
          return
        } else {
          bag.set(c, [c, distance + 1, path])
          const newPath = [...path, c.pos]
          toProcess.push([c.pos, distance + 1, newPath])
        }
      })
    }

    return { paths: Array.from(bag.values()) }
  }

  thingsInRange(hex: Hex, radius: number, innerRadius?: number): IThing[] {
    return hex.range(radius, innerRadius)
      .filter(this.isIn)
      .map(this.cellAt)
      .filter(c => c.thing)
      .map(c => c.thing!)
  }
}
