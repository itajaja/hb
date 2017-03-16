import * as store from 'store'

import { IUnitType } from '../engine/unit'
import * as units from '../engine/units'
import { debug } from '../utils'

const KEY = 'hb:gameState'

export interface IStorage {
  levelReached: number,
  party: IUnitType[]
  money: number,
}

interface IRawStorage {
  levelReached: number,
  party: string[],
  money: number,
}

export function load(): IStorage | null {
  const data = store.get(KEY)
  if (data) {
    const rawData: IRawStorage = JSON.parse(data)
    debug('storage: successfully loaded storage', rawData)
    return {
      levelReached: rawData.levelReached,
      party: rawData.party.map(u => units[u]),
      money: rawData.money,
    }
  }

  return null
}

export function save(data: IStorage): void {
  const rawData: IRawStorage = {
    levelReached: data.levelReached,
    party: data.party.map(u => u.name.toLowerCase()),
    money: data.money,
  }
  store.set(KEY, JSON.stringify(rawData))
  debug('storage: successfully saved storage', rawData)
}

export function reset(): void {
  store.remove(KEY)
}
