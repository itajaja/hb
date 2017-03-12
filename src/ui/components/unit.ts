import * as anime from 'animejs'
import { css, StyleSheet } from 'aphrodite'
import * as html from 'choo/html'

import { UnitAction } from '../../engine/actions/action'
import Unit from '../../engine/unit'
import bar from './bar'

const style = StyleSheet.create({
  main: {
    textAnchor: 'middle',
    dominantBaseline: 'central',
  },
})

const unitGlyphs = {
  Warrior: '⚔️',
  Archer: '🏹',
  Mage: '🎩',
}

export default function(unit: Unit) {
  let listenPa
  let listenTa

  return html`
    <g onload=${onLoad.bind(this)} onunload=${onUnload.bind(this)}>
      <text
        class=${css(style.main)}
        fontSize="10"
        fill=${unit.faction.color}
      >
        ${unitGlyphs[unit.type.name]}
      </text>
      ${bar(-10, 9, 20, 2, 'black', 'green', unit.hp / unit.type.hp)}
      ${bar(-10, 11, 20, 2, 'black', 'blue', unit.mp / unit.type.mp)}
    </g>
  `

  function onLoad(el: HTMLElement) {
    listenPa = unit.game.listen('performAction', (action: UnitAction) => {
      if (action.unit.id === unit.id) {
        anime({
          targets: [el],
          translateY: '-10',
          direction: 'alternate',
          duration: 350,
          easing: 'easeOutQuad',
        })
      }
    })
    listenTa = unit.game.listen('takeDamage', (eUnit: Unit) => {
      if (unit.id === eUnit.id) {
        anime({
          targets: [el],
          opacity: 0,
          direction: 'alternate',
          loop: 8,
          easing: 'easeInOutQuad',
          duration: 100,
        })
      }
    })
  }

  function onUnload() {
    listenPa()
    listenTa()
  }
}
