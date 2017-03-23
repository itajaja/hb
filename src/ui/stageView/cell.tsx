import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { ICell, Terrain } from '../../engine/map'
import EUnit from '../../engine/unit'
import Unit from '../components/unit'
import style from '../utils/style'
import transform from '../utils/transform'
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
})

const terrainStyles = StyleSheet.create({
  [Terrain.Pit]: { fill: 'transparent' },
  [Terrain.Ground]: { fill: '#5C4B3D' },
})

const overlayStyles = StyleSheet.create({
  main: {
    fill: 'transparent',
  },

  selected: {
    stroke: style.gold,
  },

  hover: {
    stroke: 'rgba(0, 0, 0, 0.3)',
  },

  target: {
    fill: 'rgba(255, 0, 0, 0.1)', stroke: 'rgba(255, 0, 0, 0.1)',
  },
  area: {
    fill: 'rgba(255, 0, 0, 0.2)', stroke: 'rgba(255, 0, 0, 0.2)',
  },
  moveTarget: {
    fill: 'rgba(255, 255, 255, 0.1)', stroke: 'rgba(255, 255, 255, 0.1)',
  },
})

interface IProps {
  store: Store,
  cell: ICell
}

export default class Cell extends React.Component<IProps, {}> {
  state = {
    up: false,
  }

  onClick = () => {
    this.props.store.selectCell(this.props.cell)
  }

  onMouseOver = () => {
    this.props.store.hover(this.props.cell)
  }

  render() {
    const { cell, store } = this.props
    const { pos, thing } = cell
    const posId = pos.toString()

    const { hover, selection } = store.state
    const unit = selection && selection.unit
    const action = unit && unit.action

    const target = action && action.targets[posId]
    const actionArea = action && action.area && action.area[posId]
    const moveTarget = !action && unit && unit.paths[posId]
      || !unit && hover && hover.unit && hover.unit.paths[posId]
    const selected = selection && selection.cell.pos.toString() === posId
    const hovered = hover && hover.cell.pos.toString() === posId

    const terrainClass = css(styles.terrain, terrainStyles[cell.terrain])
    const overlayClass = css(
      overlayStyles.main,
      target && overlayStyles.target,
      actionArea && overlayStyles.area,
      moveTarget && overlayStyles.moveTarget,
      selected && overlayStyles.selected,
      hovered && overlayStyles.hover,
    )

    const { x, y } = hexCenter(pos, cellSize)

    return (
      <g
        transform={transform.translate(x, y).toString()}
        onMouseOver={this.onMouseOver}
        onClick={this.onClick}
      >
        <polygon className={terrainClass} points={HEX_POINTS} />
        <polygon className={overlayClass} points={INNER_HEX_POINTS} />
        {thing && thing instanceof EUnit && <Unit unit={thing} />}
      </g>
    )
  }
}
