import * as React from 'react'
import { ITrait } from '../../engine/units/traits'
import icons from '../assets/icons'
import Icon from './icon'

import * as camelCase from 'lodash/camelCase'

const traitGlyphs: {[idx: string]: keyof typeof icons} = {
  flying: 'featheredWing',
}

interface IProps {
  trait: ITrait
  wrapped?: boolean
  classes?: any
}

export default class TraitGlyph extends React.PureComponent<IProps, {}> {
  render() {
    const { trait, ...props } = this.props

    const name = camelCase(trait.name)
    return <Icon icon={traitGlyphs[name]} {...props} />
  }
}
