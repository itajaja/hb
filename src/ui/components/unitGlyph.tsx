import * as React from 'react'
import { IUnitType } from '../../engine/unit'
import icons from '../assets/icons'
import Icon from './icon'

import * as camelCase from 'lodash/camelCase'

const unitGlyphs: {[idx: string]: keyof typeof icons} = {
  archer: 'highShot',
  barbarian: 'vikingHead',
  bat: 'bat',
  catapult: 'catapult',
  cleric: 'womanElfFace',
  demon: 'imp',
  dragon: 'dragonHead',
  giant: 'woodClub',
  horseman: 'horseHead',
  knight: 'visoredHelm',
  mage: 'wizardFace',
  orc: 'orcHead',
  orcArcher: 'badGnome',
  spider: 'spiderAlt',
  troll: 'troll',
  warrior: 'hornedHelm',
}

interface IProps {
  unitType: IUnitType
  wrapped?: boolean
  classes?: any
}

export default class UnitGlyph extends React.PureComponent<IProps, {}> {
  render() {
    const { unitType, ...props } = this.props

    const name = camelCase(unitType.name)
    return <Icon icon={unitGlyphs[name]} {...props} />
  }
}
