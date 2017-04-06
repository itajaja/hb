import FireBreath from '../actions/fireBreath'
import { IUnitType } from '../unit'
import { flying } from './traits'

export default {
  name: 'Dragon',
  description: '',

  hp: 20,
  mp: 4,
  mana: 0,
  resistance: 0,
  actions: [
    FireBreath,
  ],
  traits: [flying],

  cost: 24,
} as IUnitType
