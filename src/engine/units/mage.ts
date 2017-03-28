import Fireball from '../actions/fireball'
import { meleeAttack } from '../actions/meleeAttack'
import Teleport from '../actions/teleport'
import { IUnitType } from '../unit'

export default {
  name: 'Mage',
  description: 'Years of research in arcane knowledge has made the mage ' +
    'an invaluable resource on the battlefield. With his magic, he can ' +
    'destroy groups of enemies at once, or channel arcane forces to bend ' +
    'the rules of space and time',

  hp: 6,
  mp: 2,
  mana: 6,
  resistance: 0,
  actions: [
    meleeAttack({ damage: 2 }),
    Teleport,
    Fireball,
  ],

  cost: 10,
} as IUnitType
