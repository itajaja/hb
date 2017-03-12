import { css, StyleSheet } from 'aphrodite'
import * as html from 'choo/html'

import Unit from '../../engine/unit'
import bar from './bar'

const style = StyleSheet.create({
  main: {
    textAnchor: 'middle',
    dominantBaseline: 'central',
  },
})

export default function(unit: Unit) {
  return html`
    <g>
      <text
        class=${css(style.main)}
        fontSize="10"
        fill=${unit.faction.color}
      >
        ${unit.type.name[0]}
      </text>
      ${bar(-10, 9, 20, 2, 'black', 'green', unit.hp / unit.type.hp)}
      ${bar(-10, 11, 20, 2, 'black', 'blue', unit.mp / unit.type.mp)}
    </g>
  `
}
