import * as React from 'react'
import { IAction } from '../../engine/actions/action'
import icons from '../assets/icons'
import Icon from './icon'

import * as camelCase from 'lodash/camelCase'

const actionGlyphs: {[idx: string]: keyof typeof icons} = {
  fireball: 'fireRay',
  fireBreath: 'fireBreath',
  guard: 'crossShield',
  heal: 'cherish',
  jump: 'jumpAcross',
  meleeAttack: 'spinningSword',
  rangedAttack: 'targetDummy',
  rollingStone: 'crumblingBall',
  sleep: 'sleepy',
  stoneThrow: 'squib',
  teleport: 'teleport',
  twoHandedSwordAttack: 'twoHandedSword',
  web: 'spiderWeb',
}

interface IProps {
  action: IAction
  wrapped?: boolean
  classes?: any
}

export default class UnitGlyph extends React.PureComponent<IProps, {}> {
  render() {
    const { action, ...props } = this.props

    const name = camelCase(action.name)
    return <Icon icon={actionGlyphs[name]} {...props} />
  }
}
