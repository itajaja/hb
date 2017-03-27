import * as anime from 'animejs'
import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { UnitAction } from '../../engine/actions/action'
import EUnit from '../../engine/unit'
import Bar from '../components/bar'
import { ICON_SIZE } from '../components/icon'
import UnitGlyph from '../components/unitGlyph'
import transform from '../utils/transform'
import { HEX_SIZE } from './iso'

const SCALE_FACTOR = HEX_SIZE / ICON_SIZE

const styles = StyleSheet.create({
  unit: {
    transform: transform.scaleY(SCALE_FACTOR).scaleX(SCALE_FACTOR).string(),
    strokeWidth: '3%',
  },
  backBarStyle: {
    stroke: 'black',
    strokeWidth: '.5px',
    fill: 'black',
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

  onPerformAction = async (action: UnitAction) => {
    if (action.unit.id === this.props.unit.id) {
      return await anime({
        targets: [this.refs.main],
        translateY: '-10',
        direction: 'alternate',
        duration: 350,
        easing: 'easeOutQuad',
      }).finished
    }
  }

  onTakeDamage = async (unit: EUnit) => {
    if (unit.id === this.props.unit.id) {
      await anime({
        targets: [this.refs.main],
        opacity: 0,
        direction: 'alternate',
        loop: 8,
        easing: 'easeInOutQuad',
        duration: 100,
      }).finished
    }
  }

  render() {
    const { unit } = this.props
    const barProps = {
      x: -5, height: 1, width: 10, backClasses: [styles.backBarStyle],
    }

    const style = {
      stroke: unit.faction.color,
    }
    return (
      <g>
        <g ref="main">
          <g className={css(styles.unit)} style={style}>
            <UnitGlyph unitType={unit.type} />
          </g>
          <g transform="rotate(-90)">
            <Bar
              {...barProps}
              y={10}
              fill="red"
              value={unit.hp / unit.type.hp}
            />
            <Bar
              {...barProps}
              y={11}
              fill="darkgreen"
              value={unit.mp / unit.type.mp}
            />
            {unit.type.mana > 0 && <Bar
              {...barProps}
              y={12}
              fill="blue"
              value={unit.mana / unit.type.mana}
            />}
          </g>
        </g>
      </g>
    )
  }
}
