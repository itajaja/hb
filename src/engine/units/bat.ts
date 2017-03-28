import { meleeAttack } from '../actions/meleeAttack'
import { IUnitType } from '../unit'
import { flying } from './traits'

export default {
  name: 'Bat',
  description: '',

  hp: 4,
  mp: 3,
  mana: 0,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 2 }),
  ],
  traits: [flying],

  cost: 5,
} as IUnitType
