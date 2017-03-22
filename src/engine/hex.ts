import assert from './assert'

/**
 * utility library for operations over hex maps
 * source: http://www.redblobgames.com/grids/hexagons/
 */

/**
 * Immutable class representing an hexagon
 */

export default class Hex {
  private _repr: string
  constructor(private _q: number, private _r: number) {
    this._repr = `${this.q},${this.r}`
  }

  get q() { return this._q }
  get r() { return this._r }
  get s() { return -this.q - this.r }

  toString() {
    return this._repr
  }

  equals(x: Hex) {
    return this.toString() === x.toString()
  }

  add(x: Hex) {
    return new Hex(this.q + x.q, this.r + x.r)
  }

  sub(x: Hex) {
    return new Hex(this.q - x.q, this.r - x.r)
  }

  scale(k: number) {
    return new Hex(this.q * k, this.r * k)
  }

  neighbor(direction: number) {
    const dir = directions[direction]
    return this.add(dir)
  }

  isNeighbor(x: Hex) {
    return this.neighbors.some(n => n.toString() === x.toString())
  }

  get neighbors() {
    return directions.map(d => this.add(d))
  }

  distance(from: Hex) {
     const sub = this.sub(from)
     return Math.max(Math.abs(sub.q), Math.abs(sub.r), Math.abs(sub.s))
  }

  circle(radius: number) {
    assert(radius >= 0, 'radius must be greater or equal than 1')

    const result: Hex[] = []
    let hex = this.add(directions[4].scale(radius))

    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < radius; ++j) {
        result.push(hex)
        hex = hex.neighbor(i)
      }
    }
    return result
  }

  range(radius: number, innerRadius = 0): Hex[] {
    assert(radius >= innerRadius, 'radius must be greater than innerRadius')
    assert(innerRadius >= 0, 'innerRadius must be greater or equal than 0')

    if (radius === 0) {
      return [this]
    }

    const circle = this.circle(radius)

    return radius === innerRadius
      ? circle
      : [...circle, ...this.range(radius - 1, innerRadius)]
  }
}

export const CENTER = new Hex(0, 0)

export const directions = [
  new Hex(+1, +0), new Hex(+1, -1), new Hex(+0, -1),
  new Hex(-1, +0), new Hex(-1, +1), new Hex(+0, +1),
]
