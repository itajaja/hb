import { meleeAttack } from '../actions/meleeAttack'
import { twoHandedSwordAttack } from '../actions/twoHandedSwordAttack'
import { IUnitType } from '../unit'

export default {
  name: 'Barbarian',
  description: 'Fearlessness and bloodlust substitute the mail coat of the ' +
    'savage barbarian. Wielding a massive sword, the barbarian is ' +
    'capable of attacking multiple enemies at once',

  hp: 8,
  mp: 3,
  mana: 0,
  resistance: 0,
  actions: [
    twoHandedSwordAttack({ damage: 4 }),
    meleeAttack({ damage: 4 }),
  ],

  cost: 9,
} as IUnitType
