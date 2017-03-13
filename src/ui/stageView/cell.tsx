import { css, StyleSheet } from 'aphrodite'

import * as React from 'React'
import { ICell } from '../../engine/map'
import EUnit from '../../engine/unit'
import Unit from '../components/unit'
import Store from './store'

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

const styles = StyleSheet.create({
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

  selected: {
    fill: 'red',
  },
  actionTargeted: {
    fill: 'yellow',
  },
  walkTargeted: {
    fill: 'brown',
  },
})

function translate(x, y) {
  return `translate(${x},${y})`
}

interface IProps {
  store: Store,
  cell: ICell
}

export default class Cell extends React.Component<IProps, {}> {
  handleClick = () => {
    this.props.store.selectCell(this.props.cell)
  }

  render() {
    const { cell, store } = this.props
    const { pos, thing } = cell
    const { selectedAction, selectedCell, targets } = store.state
    const { x, y } = hexCenter(pos, cellSize)

    let selected = false
    if (selectedCell && pos.toString() === selectedCell.pos.toString()) {
      selected = true
    }
    let targetStyle
    if (targets && targets[pos.toString()]) {
      targetStyle = selectedAction
        ? styles.actionTargeted
        : styles.walkTargeted
    }

    const polygonClass = css(
      styles.main,
      selected && styles.selected,
      targetStyle,
    )

    return (
      <g transform={translate(x, y)} onClick={this.handleClick}>
        {thing && thing instanceof EUnit && <Unit unit={thing} />}
        <polygon className={polygonClass} points={HEX_POINTS} /> 
      </g>
    )
  }
}
