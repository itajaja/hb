import Heal from '../actions/heal'
import { meleeAttack } from '../actions/meleeAttack'
import Sleep from '../actions/sleep'
import { IUnitType } from '../unit'

export default {
  name: 'Cleric',
  description: 'Instructed in the holy scriptures and hardened by intense ' +
    'fasting and meditation, the Cleric can be a tremendous asset to any ' +
    'party',

  hp: 6,
  mp: 2,
  mana: 6,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 2 }),
    Heal,
    Sleep,
  ],

  cost: 10,
} as IUnitType
