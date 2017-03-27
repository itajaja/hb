import * as color from 'color'
import * as React from 'react'

import { Terrain } from '../../engine/map'
import * as svg from '../utils/svg'
import * as iso from './iso'

const WALL_HEIGHT = iso.HEX_SIZE * 2

function makeTerrainStyle(fill, stroke) {
  return {
    tile: { fill, stroke, strokeWidth: '.05%' },
    eastWall: { fill: color(fill).darken(.7).string() },
    southWall: { fill: color(fill).darken(.6).string() },
    westWall: { fill: color(fill).darken(.5).string() },
  }
}

const terrainStyles = {
  [Terrain.Pit]: makeTerrainStyle('transparent', 'transparent'),
  [Terrain.Ground]: makeTerrainStyle('#5C4B3D', 'black'),
}

const SOUTH_WALL = svg.points(
  { x: iso.HEX_POINTS.sw.x, y: iso.HEX_POINTS.sw.y },
  { x: iso.HEX_POINTS.sw.x, y: iso.HEX_POINTS.sw.y + WALL_HEIGHT },
  { x: iso.HEX_POINTS.se.x, y: iso.HEX_POINTS.se.y + WALL_HEIGHT },
  { x: iso.HEX_POINTS.se.x, y: iso.HEX_POINTS.se.y },
)

const WEST_WALL = svg.points(
  { x: iso.HEX_POINTS.sw.x, y: iso.HEX_POINTS.sw.y },
  { x: iso.HEX_POINTS.sw.x, y: iso.HEX_POINTS.sw.y + WALL_HEIGHT },
  { x: iso.HEX_POINTS.w.x, y: iso.HEX_POINTS.w.y + WALL_HEIGHT },
  { x: iso.HEX_POINTS.w.x, y: iso.HEX_POINTS.w.y },
)

const EAST_WALL = svg.points(
  { x: iso.HEX_POINTS.se.x, y: iso.HEX_POINTS.se.y },
  { x: iso.HEX_POINTS.se.x, y: iso.HEX_POINTS.se.y + WALL_HEIGHT },
  { x: iso.HEX_POINTS.e.x, y: iso.HEX_POINTS.e.y + WALL_HEIGHT },
  { x: iso.HEX_POINTS.e.x, y: iso.HEX_POINTS.e.y },
)

export interface IProps {
  terrain: Terrain,
}

export default class Tile extends React.PureComponent<IProps, void> {
  render() {
    const styles = terrainStyles[this.props.terrain]

    return (
      <g>
        <defs>
          <linearGradient id="eastWall" x1="27%" x2="73%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={styles.eastWall.fill} />
            <stop offset="60%"
              stopColor={styles.eastWall.fill}
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient id="southWall" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={styles.southWall.fill} />
            <stop offset="80%"
              stopColor={styles.southWall.fill}
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient id="westWall" x1="63%" x2="37%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={styles.westWall.fill} />
            <stop offset="70%"
              stopColor={styles.westWall.fill}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <polygon points={SOUTH_WALL} fill="url(#southWall)" />
        <polygon points={WEST_WALL} fill="url(#westWall)" />
        <polygon points={EAST_WALL} fill="url(#eastWall)" />
        <polygon style={styles.tile} points={iso.drawHex(1)} />
      </g>
    )
  }
}
