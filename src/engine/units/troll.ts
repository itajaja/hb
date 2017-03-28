import { meleeAttack } from '../actions/meleeAttack'
import { IUnitType } from '../unit'

export default {
  name: 'Troll',
  description: '',

  hp: 12,
  mp: 2,
  mana: 0,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 5 }),
  ],

  cost: 10,
} as IUnitType
