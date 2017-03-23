import * as anime from 'animejs'
import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { UnitAction } from '../../engine/actions/action'
import EUnit from '../../engine/unit'
import Bar from '../components/bar'
import UnitGlyph from '../components/unitGlyph'
import style from '../utils/style'
import transform from '../utils/transform'

const styles = StyleSheet.create({
  container: {
    transform: transform.scaleY(1 / style.isometricScaleY).toString(),
  },
  unit: {
    transform: transform.scaleY(.1).scaleX(.1).toString(),
    strokeWidth: 3,
  },
})

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

    const style = {
      stroke: unit.faction.color,
    }
    return (
      <g className={css(styles.container)}>
        <g ref="main">
          <g className={css(styles.unit)} style={style}>
            <UnitGlyph unitType={unit.type} />
          </g>
          <Bar {...barProps} y={9} c2={'red'} value={unit.hp / unit.type.hp} />
          <Bar
            {...barProps}
            y={10}
            c2={'darkgreen'}
            value={unit.mp / unit.type.mp}
          />
          {unit.type.mana > 0 && <Bar
            {...barProps}
            y={11}
            c2={'blue'}
            value={unit.mana / unit.type.mana}
          />}
        </g>
      </g>
    )
  }
}
