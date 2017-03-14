import Hex from '../engine/hex'
import { Terrain } from '../engine/map'
import { IUnitType } from '../engine/unit'
import * as units from '../engine/units'

export interface ILevelDefinition {
  map: {
    size: number,
    terrains: Map<Terrain, number>,
  }

  opponents: Map<IUnitType, number>

  partyDeployOrigin: Hex
}

const level1 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 20],
    ]),
  },

  opponents: new Map([
    [units.warrior, 2],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const levels: ILevelDefinition[] = [
  level1,
]

export default levels
