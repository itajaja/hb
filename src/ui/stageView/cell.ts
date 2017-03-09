import { css, StyleSheet } from 'aphrodite'
import * as html from 'choo/html'

import { ICell } from '../../engine/map'
import Unit from '../../engine/unit'
import unit from '../components/unit'

export const cellSize = 20

function hexCenter({ q, r }, radius) {
  return {
    x: radius * (3 / 2) * r,
    y: radius * Math.sqrt(3) * (q + r / 2),
  }
}

function hexCorner(x, y, size, i) {
  const angleDeg = 60 * i
  const angleRad = Math.PI / 180 * angleDeg
  return `${x + size * Math.cos(angleRad)},${y + size * Math.sin(angleRad)}`
}

const HEX_POINTS = [0, 1, 2, 3, 4, 5]
  .map(i => hexCorner(0, 0, cellSize, i))
  .join(' ')

const style = StyleSheet.create({
  main: {
    cursor: 'pointer',
    stroke: 'white',
    margin: '1px',
    strokeWidth: '.1px',
    fillRule: 'evenodd',
    fill: 'transparent',
    fillOpacity: .1,
    transition: '.1s ease-in-out all',

    ':hover': {
      stroke: 'green',
    },
  },
})

function translate(x, y) {
  return `translate(${x},${y})`
}

export default function cell(cell: ICell) {
  const { pos, thing } = cell
  const { x, y } = hexCenter(pos, cellSize)

  return html`
    <g transform=${translate(x, y)} onclick=${handleClick}>
      <polygon class=${css(style.main)} points=${HEX_POINTS}/>
      ${thing && thing instanceof Unit && unit(thing)}
    </g>
  `

  function handleClick() {
  //   const { actions, cell, selection } = this.props

  //   if (selection && selection.actionKey) {
  //     // perform action
  //   } else {
  //     actions.selectCell(cell.pos)
  //   }
  }
}
