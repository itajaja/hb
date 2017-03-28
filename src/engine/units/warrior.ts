import Guard from '../actions/guard'
import { meleeAttack } from '../actions/meleeAttack'
import { IUnitType } from '../unit'

export default {
  name: 'Warrior',
  description: 'The Warrior has trained all his life to fear nothing but ' +
    'dishonor. He represents the basic and most important unit of any army ' +
    'or party',

  hp: 10,
  mp: 3,
  mana: 0,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 3 }),
    Guard,
  ],

  cost: 8,
} as IUnitType
