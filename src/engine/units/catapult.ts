import { stoneThrow } from '../actions/stoneThrow'
import { IUnitType } from '../unit'

export default {
  name: 'Catapult',
  description: 'Designed by the smartest engineers of the realm, the ' +
    'catapult is able to throw stones from a considerable ' +
    'distance, bringing disarry in the enemy lines even before the battle ' +
    ' has started',

  hp: 8,
  mp: 1,
  mana: 0,
  resistance: 0,
  actions: [stoneThrow({ damage: 4, area: 1 })],

  cost: 6,
} as IUnitType
