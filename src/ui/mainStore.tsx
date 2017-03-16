import createLevel from '../content/createLevel'
import levels from '../content/levels'
import Game from '../engine/game'
import { IUnitType } from '../engine/unit'
import * as units from '../engine/units'
import { debug } from '../utils'
import * as storage from './storage'
import Store from './utils/Store'

export interface IState {
  levelReached: number,
  party: IUnitType[]
  money: number,

  currentGame?: {
    game: Game,
    level: number,
    playerFaction: string,
  }
}

export default class MainStore extends Store<IState> {
  finishGame = (won: boolean) => {
    if (won) {
      const { money, currentGame } = this.state
      const { game, level, playerFaction } = currentGame!

      this.set({
        money: money + levels[level].reward,
        party: game.factionUnits[playerFaction].map(u => u.type),
        levelReached: level + 1,
        currentGame: undefined,
      }, this.save)
    } else {
      this.set({ currentGame: undefined })
    }

    debug('mainStore: finished game', won)
  }

  startGame(level: number) {
    debug('mainStore: starting new game')
    const levelDef = levels[level]
    const game = createLevel(levelDef, this.state.party)
    this.set({
      currentGame: {
        game,
        level: 0,
        // The player faction is the first one, the rest are AIs
        playerFaction: Array.from(game.factions.keys())[0],
      },
    })
  }

  purchase = (cart: IUnitType[], cost: number) => {
    debug('mainStore: purchased', cart, 'for', cost)
    this.set({
      money: this.state.money - cost,
      party: [...this.state.party, ...cart],
    }, this.save)
  }

  resetProgress = () => {
    debug('mainStore: resetting progress')
    storage.reset()
    this.set(this.loadProgress())
  }

  loadProgress = () => {
    return storage.load() || this.getInitialState()
  }

  private getInitialState = () => {
    return {
      levelReached: 0,
      party: [units.archer, units.warrior, units.warrior, units.warrior],
      money: 0,
    }
  }

  private save = () => {
    storage.save({
      money: this.state.money,
      party: this.state.party,
      levelReached: this.state.levelReached,
    })
  }
}
