import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { IUnitType } from '../../engine/unit'
import unitGlyph from '../components/unitGlyph'
import style from '../utils/style'

const styles = StyleSheet.create({
  unit: {
    padding: 10,
    width: 50,
    height: 50,
    fill: style.textColor,
    stroke: 'black',
  },
})

interface IProps {
  unitType: IUnitType,
}

export default function Unit({ unitType }: IProps) {
  return (
    <svg viewBox="-150 -150 300 300" className={css(styles.unit)}>
      {unitGlyph(unitType)}
    </svg>
  )
}
