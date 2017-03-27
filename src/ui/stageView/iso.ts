import Hex from '../../engine/hex'
import { objectValues } from '../../utils'
import * as svg from '../utils/svg'

export const HEX_SIZE = 20

export const SCALE_Y_FACTOR = .7

function hexCorner(i): svg.IPoint {
  const angleDeg = 60 * i
  const angleRad = Math.PI / 180 * angleDeg
  return {
    x: Math.cos(angleRad) * HEX_SIZE,
    y: Math.sin(angleRad) * SCALE_Y_FACTOR * HEX_SIZE,
  }
}

/**
 * project an hexagon over the isometric view
 */
export function projectHex({ q, r }: Hex): svg.IPoint {
  return {
    x: (3 / 2) * r * HEX_SIZE,
    y: Math.sqrt(3) * (q + r / 2) * SCALE_Y_FACTOR * HEX_SIZE,
  }
}

export const HEX_POINTS = {
  e: hexCorner(0),
  se: hexCorner(1),
  sw: hexCorner(2),
  w: hexCorner(3),
  nw: hexCorner(4),
  ne: hexCorner(5),
}

export function drawHex(radius) {
  const points = objectValues(HEX_POINTS)
    .map(p => svg.scale(p, radius))
  return svg.points(...points)
}
