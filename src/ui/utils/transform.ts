/**
 * chainable class for creating transformations
 */
class Transformer {
  private transforms: string

  constructor(acc = '', transform?: string) {
    if (transform) {
      this.transforms = `${acc} ${transform}`
    }
  }

  translate(x: number, y: number, unit = '') {
    return this.chain(`translate(${x}${unit},${y}${unit})`)
  }

  scaleX(x: number) {
    return this.chain(`scaleX(${x})`)
  }

  scaleY(x: number) {
    return this.chain(`scaleY(${x})`)
  }

  skewX(x: number) {
    return this.chain(`skewX(${x}deg)`)
  }

  skewY(x: number) {
    return this.chain(`skewY(${x}deg)`)
  }

  rotate(x: number) {
    return this.chain(`rotate(${x}deg)`)
  }

  string() {
    return this.transforms
  }

  private chain(transform: string) {
    return new Transformer(this.transforms, transform)
  }
}

const transform = new Transformer()

export default transform
