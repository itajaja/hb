import { meleeAttack } from '../actions/meleeAttack'
import { IUnitType } from '../unit'

export default {
  name: 'Orc',
  description: '',

  hp: 5,
  mp: 3,
  mana: 0,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 3 }),
  ],

  cost: 5,
} as IUnitType
