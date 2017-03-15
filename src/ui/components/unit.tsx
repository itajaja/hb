import * as anime from 'animejs'
import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { UnitAction } from '../../engine/actions/action'
import EUnit from '../../engine/unit'
import Bar from './bar'

const styles = StyleSheet.create({
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

interface IProps {
  unit: EUnit,
}

export default class Unit extends React.Component<IProps, {}> {
  listeners: Array<(...args: any[]) => void>

  constructor(props: IProps, ctx) {
    super(props, ctx)
    const { game } = this.props.unit
    this.listeners = [
      game.listen('performAction', this.onPerformAction),
      game.listen('takeDamage', this.onTakeDamage),
    ]
  }

  componentWillUnmount() {
    this.listeners.forEach(unsubscribe => unsubscribe())
  }

  onPerformAction = (action: UnitAction) => {
    if (action.unit.id === this.props.unit.id) {
      anime({
        targets: [this.refs.main],
        translateY: '-10',
        direction: 'alternate',
        duration: 350,
        easing: 'easeOutQuad',
      })
    }
  }

  onTakeDamage = (unit: EUnit) => {
    if (unit.id === this.props.unit.id) {
      anime({
        targets: [this.refs.main],
        opacity: 0,
        direction: 'alternate',
        loop: 8,
        easing: 'easeInOutQuad',
        duration: 100,
      })
    }
  }

  render() {
    const { unit } = this.props
    const barProps = { x: -10, height: 1, width: 20, c1: 'black' }

    return (
      <g ref="main">
        <text
          className={css(styles.main)}
          fontSize="10"
          fill={unit.faction.color}
          style={{
            // tslint:disable-next-line:max-line-length
            textShadow: `black 0 0 5px, ${unit.faction.color} 0 0 10em, ${unit.faction.color} 0 0 10em`,
          }}
        >
          {unitGlyphs[unit.type.name]}
        </text>
        <Bar {...barProps} y={9} c2={'green'} value={unit.hp / unit.type.hp} />
        <Bar {...barProps} y={10} c2={'blue'} value={unit.mp / unit.type.mp} />
      </g>
    )
  }
}
