import MeleeAttack from '../actions/meleeAttack'
import RangedAttack from '../actions/rangedAttack'
import { IUnitType } from '../unit'

export default {
  name: 'Archer',
  description: 'The archer is able to bring despair upon his enemies ' +
    'while they are still out of sight. He travels lightly, and he prefers ' +
    'to stay at away from the heart of the battle.',

  hp: 8,
  mp: 3,
  actions: [MeleeAttack, RangedAttack],

  cost: 8,
} as IUnitType
