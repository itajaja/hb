import assert from '../engine/assert'
import Faction from '../engine/faction'
import Game from '../engine/game'
import Hex from '../engine/hex'
import HexMap, { IMap, Terrain } from '../engine/map'
import { IUnitType } from '../engine/unit'
import { ILevelDefinition } from './levels'

const CLUSTERING_PROBABILITY = .75
const REC_LIMIT = 100000

function tryUntil<T>(
  f: () => T, predicate: (item: T) => boolean, limit = REC_LIMIT,
) {
  while (true) {
    assert(limit > 0, 'recursion exceeded. Revisit your parameters')
    const item = f()
    if (predicate(item)) {
      return item
    }

    limit--
  }
}

function getRandomCell(map: IMap) {
  const { cells } = map
  return cells[Math.floor(Math.random() * cells.length)]
}

function getRandomNeighbor(map: IMap, hex: Hex) {
  const neighbors = hex.neighbors.filter(map.isIn)
  return neighbors[Math.floor(Math.random() * neighbors.length)]
}

export default function createLevel(
  def: ILevelDefinition, party: IUnitType[],
): Game {
  const map = new HexMap(def.map.size, [])

  // add terrains
  def.map.terrains.forEach((amount, terrain) => {
    let curCell = tryUntil(
      () => getRandomCell(map),
      c => c.terrain === Terrain.Ground,
    )
    while (amount > 0) {
      let tempPos
      // determines if the next cell should be anywhere else or attached to
      // the previous one
      const cellFinder = Math.random() > CLUSTERING_PROBABILITY
        ? () => getRandomCell(map)
        : () => {
          tempPos = getRandomNeighbor(map, curCell.pos)
          return map.cellAt(tempPos)
        }
      curCell = tryUntil(cellFinder, c => c.terrain === Terrain.Ground)

      curCell.terrain = terrain
      amount--
    }
  })

  const fa = new Faction('Greens', '#00A000')
  const fb = new Faction('Reds', '#A00000')

  const game = new Game({ factions: [fa, fb], map })

  // add friendly units
  party.forEach(unit => {
    let tempPos = def.partyDeployOrigins[0]
    tryUntil(
      () => {
        tempPos = getRandomNeighbor(map, tempPos)
        const c = map.cellAt(tempPos)
        return c
      },
      c => c.terrain === Terrain.Ground && !c.thing,
    )

    game.addUnit({ factionId: fa.id, pos: tempPos, type: unit })
  })

  // add enemy units
  def.opponents.forEach((amount, unit) => {
    while (amount > 0) {
      let tempPos = def.partyDeployOrigins[1]
      tryUntil(
        () => {
          tempPos = getRandomNeighbor(map, tempPos)
          const c = map.cellAt(tempPos)
          return c
        },
        c => c.terrain === Terrain.Ground && !c.thing,
      )

      game.addUnit({ factionId: fb.id, pos: tempPos, type: unit })
      amount--
    }
  })

  return game
}
