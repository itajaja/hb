import Fireball from '../actions/fireball'
import Heal from '../actions/heal'
import MeleeAttack from '../actions/meleeAttack'
import { IUnitType } from '../unit'

export default {
  name: 'Mage',
  description: 'Years of research in arcane knowledge has made the mage ' +
    'an invaluable resource on the battlefield. With his magic, he can ' +
    'destroy groups of enemies at once, or channel healing energies to ' +
    'support his wounded comrades',

  hp: 6,
  mp: 2,
  actions: [MeleeAttack, Heal, Fireball],
} as IUnitType
