import Jump from '../actions/jump'
import { meleeAttack } from '../actions/meleeAttack'
import { IUnitType } from '../unit'

export default {
  name: 'Horseman',
  description: 'The valiant rider of the party is able to cover long ' +
  'distances with his mighty steed and bring fast help in the heat of the' +
  'battle',

  hp: 12,
  mp: 4,
  mana: 0,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 3 }),
    Jump,
  ],

  cost: 10,
} as IUnitType
