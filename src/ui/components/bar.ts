import * as html from 'choo/html'

export default function(
  x: number, y: number, w: number, height: number, c1: string, c2: string,
  amount: number,
) {
  const commonStyle = {x, y, height}
  const progress = amount * w

  return html`
    <g>
      <rect ${commonStyle} width=${w} fill=${c1} />
      <rect ${commonStyle} width=${progress} fill=${c2} />
    </g>
  `
}
