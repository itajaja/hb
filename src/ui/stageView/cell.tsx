import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { ICell, Terrain } from '../../engine/map'
import EUnit from '../../engine/unit'
import Unit from '../components/unit'
import style from '../utils/style'
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
  .map(i => hexCorner(0, 0, cellSize - .1, i))
  .join(' ')
const INNER_HEX_POINTS = [0, 1, 2, 3, 4, 5]
  .map(i => hexCorner(0, 0, cellSize - 1, i))
  .join(' ')

const styles = StyleSheet.create({
  terrain: {
    cursor: 'pointer',
    stroke: 'white',
    strokeWidth: .1,
    transition: '.1s ease-in-out all',
  },

  targetOverlay: {
    fill: 'transparent',

    ':hover': {
      stroke: 'rgba(0, 0, 0, 0.3)',
    },
  },
})

const terrainStyles = StyleSheet.create({
  [Terrain.Pit]: { fill: 'transparent' },
  [Terrain.Ground]: { fill: '#5C4B3D' },
})

const targetStyles = StyleSheet.create({
  selected: {
    stroke: style.gold,
    ':hover': {
      stroke: style.gold,
    },
  },
  actionTargeted: {
    fill: 'rgba(255, 0, 0, 0.1)', stroke: 'rgba(255, 0, 0, 0.1)',
  },
  walkTargeted: {
    fill: 'rgba(255, 255, 255, 0.1)', stroke: 'rgba(255, 255, 255, 0.1)',
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
        ? targetStyles.actionTargeted
        : targetStyles.walkTargeted
    }

    const terrainClass = css(
      styles.terrain, terrainStyles[cell.terrain],
    )
    const overlayClass = css(
      styles.targetOverlay,
      selected && targetStyles.selected,
      targetStyle,
    )

    return (
      <g transform={translate(x, y)} onClick={this.handleClick}>
        <polygon className={terrainClass} points={HEX_POINTS}/>
        {thing && thing instanceof EUnit && <Unit unit={thing} />}
        <polygon
          className={overlayClass}
          points={INNER_HEX_POINTS}
        />
      </g>
    )
  }
}
