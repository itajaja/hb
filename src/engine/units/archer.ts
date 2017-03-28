import { meleeAttack } from '../actions/meleeAttack'
import { rangedAttack } from '../actions/rangedAttack'
import { IUnitType } from '../unit'

export default {
  name: 'Archer',
  description: 'The archer is able to bring despair upon his enemies ' +
    'while they are still out of sight. He travels lightly, and he prefers ' +
    'to stay away from the heart of the battle.',

  hp: 8,
  mp: 3,
  mana: 0,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 2 }),
    rangedAttack({ damage: 3, range: [6, 2] }),
  ],

  cost: 8,
} as IUnitType
