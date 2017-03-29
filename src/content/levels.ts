import Hex from '../engine/hex'
import { Terrain } from '../engine/map'
import { IUnitType } from '../engine/unit'
import races from '../engine/units/races'

export interface ILevelDefinition {
  map: {
    size: number,
    terrains: Map<Terrain, number>,
  }

  opponents: Map<IUnitType, number>

  partyDeployOrigin: Hex

  reward: number
}

const STARTING_ENEMY_VALUE = 10
const MIN_MAP_SIZE = 5
const MAX_MAP_SIZE = 10

function cellsInMap(size: number) {
  // XXX there might be a better way to calculate this, but yolo
  if (size === 1) {
    return 1
  }

  return cellsInMap(size - 1) + (size - 1) * 6
}



function weightedRandomPick(items: number[]): number {
  const sum = items.reduce((a, b) => a + b, 0)
  const draw = Math.random() * sum

  let acc = 0
  for (const [i, value] of Array.from(items.entries())) {
    acc += value
    if (acc > draw) {
      return i
    }
  }

  throw new Error('Unreachable')
}

// this is greedy and more optimal solutions could be found, but it's not
// a huge deal
function pickOpponents(value: number, bag: IUnitType[] = []): IUnitType[] {
  const monsters = races.monsters.filter(m => m.cost <= value)
  if (monsters.length === 0) {
    // no additional monsters are selectable
    return bag
  }

  // the probability of picking a monster is the inverse of its cost
  const probabilities = monsters.map(m => 1 / m.cost)
  const pickedMonster = monsters[weightedRandomPick(probabilities)]

  return pickOpponents(value - pickedMonster.cost, [...bag, pickedMonster])
}

/**
 * each level N is defined by the following equation:
 * - enemy_sum_cost: 10 + N * 10
 * - reward: enemy_sum_cost * Max(20 - N, 1) / 20
 * - map_size: Max(Floor(5 + (N / 3)), 10)
 */
export function generateLevel(number): ILevelDefinition {
  const enemyValue = STARTING_ENEMY_VALUE + number * 10
  const reward = enemyValue * Math.max(20 - number, 1) / 20
  const mapSize = Math.min(MIN_MAP_SIZE + Math.floor(number / 3), MAX_MAP_SIZE)
  const pits = Math.floor(cellsInMap(mapSize) * 0.2)

  return {
    map: {
      size: mapSize,
      terrains: new Map([
        [Terrain.Pit, pits],
      ]),
    },

    opponents: pickOpponents(enemyValue).reduce(
      (acc: Map<IUnitType, number>, unit) => {
        const units = acc.get(unit) || 0
        acc.set(unit, units + 1)
        return acc
      },
      new Map(),
    ),

    partyDeployOrigin: new Hex(mapSize, 0),

    reward,
  }
}
