import * as React from 'react'

import Hex from '../../engine/hex'
import { objectValues } from '../../utils'
import transform from '../utils/transform'
import * as iso from './iso'
import Store from './store'
import TileOverlay, { OverlayState } from './TileOverlay'

interface IProps {
  store: Store,
}

export default class Overlays extends React.Component<IProps, {}> {
  computeOverlays() {
    const overlays = new Map<Hex, OverlayState[]>()

    const set = (cell: Hex, style: OverlayState) => {
      const overlay = overlays.get(cell) || []
      overlay.push(style)
      overlays.set(cell, overlay)
    }

    const { hover, selection } = this.props.store.state
    if (selection) {
      set(selection.cell.pos, 'selected')

      const action = selection.unit && selection.unit.action
      const paths = selection.unit && selection.unit.paths

      if (action) {
        objectValues(action.targets).forEach(t => set(t, 'target'))
      } else if (paths) {
        objectValues(paths).forEach(t => set(t, 'moveTarget'))
      }
    }
    if (hover) {
      set(hover.cell.pos, 'hover')

      const selectedUnit  = selection && selection.unit
      const selectedAction = selectedUnit && selectedUnit.action
      if (selectedAction) {
        objectValues(selectedAction.area || {}).forEach(
          t => set(t, 'areaOfEffect'),
        )
      }

      if (!selectedUnit && hover.unit) {
        objectValues(hover.unit.paths).forEach(t => set(t, 'moveTarget'))
      }
    }

    return overlays
  }

  render() {
    const overlays = Array.from(this.computeOverlays().entries())

    const overlaysCells = overlays .map(([pos, style], idx) => {
      const { x, y } = iso.projectHex(pos)

      return (
        < g transform= { transform.translate(x, y).string() } key= { idx } >
          <TileOverlay state={style} />
        </g >
      )
    })

    return <g>{overlaysCells}</g>
  }
}
