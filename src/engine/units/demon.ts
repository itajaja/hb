import { meleeAttack } from '../actions/meleeAttack'
import { IUnitType } from '../unit'
import { flying } from './traits'

export default {
  name: 'Demon',
  description: '',

  hp: 10,
  mp: 4,
  mana: 0,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 3 }),
  ],
  traits: [flying],

  cost: 10,
} as IUnitType
