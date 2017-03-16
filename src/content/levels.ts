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

const level2 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 20],
    ]),
  },

  opponents: new Map([
    [units.warrior, 1],
    [units.archer, 1],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const level3 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 20],
    ]),
  },

  opponents: new Map([
    [units.warrior, 1],
    [units.archer, 2],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const level4 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 20],
    ]),
  },

  opponents: new Map([
    [units.warrior, 3],
    [units.mage, 1],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const level5 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 20],
    ]),
  },

  opponents: new Map([
    [units.warrior, 2],
    [units.archer, 2],
    [units.mage, 1],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const level6 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 50],
    ]),
  },

  opponents: new Map([
    [units.archer, 6],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const level7 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 20],
    ]),
  },

  opponents: new Map([
    [units.warrior, 4],
    [units.mage, 3],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const level8 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 20],
    ]),
  },

  opponents: new Map([
    [units.warrior, 10],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const level9 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 20],
    ]),
  },

  opponents: new Map([
    [units.warrior, 4],
    [units.archer, 3],
    [units.mage, 1],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const level10 = {
  map: {
    size: 5, // 90 tiles total
    terrains: new Map([
      [Terrain.Pit, 20],
    ]),
  },

  opponents: new Map([
    [units.warrior, 2],
    [units.archer, 4],
    [units.mage, 4],
  ]),

  partyDeployOrigin: new Hex(5, 0),
}

const levels: ILevelDefinition[] = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10,
]

export default levels
