import * as React from 'react'
import { IUnitType } from '../../engine/unit'
import icons from '../assets/icons'
import Icon from './icon'

const unitGlyphs: {[idx: string]: keyof typeof icons} = {
  archer: 'highShot',
  barbarian: 'vikingHead',
  catapult: 'catapult',
  cleric: 'womanElfFace',
  horseman: 'horseHead',
  knight: 'visoredHelm',
  mage: 'wizardFace',
  warrior: 'hornedHelm',
}

interface IProps {
  unitType: IUnitType
}

export default class UnitGlyph extends React.Component<IProps, {}> {
  shouldComponentUpdate(nextProps: IProps) {
    return this.props.unitType !== nextProps.unitType
  }

  render() {
    return <Icon icon={unitGlyphs[this.props.unitType.name.toLowerCase()]} />
  }
}
