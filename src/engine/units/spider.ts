import { meleeAttack } from '../actions/meleeAttack'
import Web from '../actions/web'
import { IUnitType } from '../unit'

export default {
  name: 'Spider',
  description: '',

  hp: 4,
  mp: 4,
  mana: 0,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 2 }),
    Web,
  ],

  cost: 5,
} as IUnitType
