import { css, StyleSheet } from 'aphrodite'
import * as html from 'choo/html'

import Unit from '../../engine/unit'

const style = StyleSheet.create({
  main: {
    textAnchor: 'middle',
    dominantBaseline: 'central',
  },
})

export default function(unit: Unit) {
  return html`
    <text
      class=${css(style.main)}
      fontSize="10"
      fill=${unit.faction.color}
    >
      ${unit.type.name[0]}
    </text>
  `
}
