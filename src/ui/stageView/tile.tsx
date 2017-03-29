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

const groundStyle = makeTerrainStyle('#5C4B3D', 'black')
const groundTile = (
  <g>
    <defs>
      <linearGradient id="eastWallGround" x1="27%" x2="73%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={groundStyle.eastWall.fill} />
        <stop offset="30%" stopColor={groundStyle.eastWall.fill} />
        <stop offset="70%"
          stopColor={groundStyle.eastWall.fill}
          stopOpacity="0"
        />
      </linearGradient>
      <linearGradient id="southWallGround" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={groundStyle.southWall.fill} />
        <stop offset="50%" stopColor={groundStyle.southWall.fill} />
        <stop offset="90%"
          stopColor={groundStyle.southWall.fill}
          stopOpacity="0"
        />
      </linearGradient>
      <linearGradient id="westWallGround" x1="63%" x2="37%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={groundStyle.westWall.fill} />
        <stop offset="40%" stopColor={groundStyle.westWall.fill} />
        <stop offset="80%"
          stopColor={groundStyle.westWall.fill}
          stopOpacity="0"
        />
      </linearGradient>
    </defs>
    <polygon points={SOUTH_WALL} fill="url(#southWallGround)" />
    <polygon points={WEST_WALL} fill="url(#westWallGround)" />
    <polygon points={EAST_WALL} fill="url(#eastWallGround)" />
    <polygon style={groundStyle.tile} points={iso.drawHex(1)} />
  </g>
)

const pitTile = (
  <g>
    <polygon fill="transparent" points={iso.drawHex(1)} />    
  </g>
)

const tiles = {
  [Terrain.Ground]: groundTile,
  [Terrain.Pit]: pitTile,
}

export interface IProps {
  terrain: Terrain,
}

export default class Tile extends React.PureComponent<IProps, void> {
  render() {
    return tiles[this.props.terrain]
  }
}
