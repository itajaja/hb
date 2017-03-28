import { rangedAttack } from '../actions/rangedAttack'
import { IUnitType } from '../unit'

export default {
  name: 'Orc Archer',
  description: '',

  hp: 4,
  mp: 2,
  mana: 0,
  resistance: 0,
  actions: [
    rangedAttack({ damage: 3, range: [5, 2] }),
  ],

  cost: 5,
} as IUnitType
