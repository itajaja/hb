/**
 * utility library for operations over hex maps
 * source: http://www.redblobgames.com/grids/hexagons/
 */

/**
 * Immutable class representing an hexagon
 */
export default class Hex {
  constructor(private _q: number, private _r: number) {}

  get q() { return this._q }
  get r() { return this._r }
  get s() { return -this.q - this.r }

  toString() {
    return `${this.q},${this.r}`
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

  get neighbors() {
    return directions.map(d => this.add(d))
  }

  distance(x: Hex) {
     const sub = this.sub(x)
     return Math.max(Math.abs(sub.q), Math.abs(sub.r), Math.abs(sub.r))
  }

  circle(radius: number) {
    const result: Hex[] = []
    let hex = this.add(directions[4].scale(radius))

    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < radius; ++j) {
        result.push(hex)
        hex = this.neighbor(i)
      }
    }
    return result
  }

  range(radius: number): Hex[] {
    if (radius === 0) {
      return [this]
    } else {
      return this.circle(radius).concat(this.range(radius - 1))
    }
  }
}

export const CENTER = new Hex(0, 0)

export const directions = [
  new Hex(+1, +0), new Hex(+1, -1), new Hex(+0, -1),
  new Hex(-1, +0), new Hex(-1, +1), new Hex(+0, +1),
]
