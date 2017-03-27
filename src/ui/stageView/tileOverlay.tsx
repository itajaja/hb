import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import style from '../utils/style'
import * as iso from './iso'

export type OverlayState = 'selected' | 'hover' | 'target'
  | 'moveTarget' | 'areaOfEffect'

type IProps = React.HTMLAttributes<{}> & React.SVGProps & {
  state: OverlayState[],
}

const styles = StyleSheet.create({
  main: {
    fill: 'transparent',
    strokeWidth: '.2%',
  },

  selected: {
    stroke: style.gold,
  },

  hover: {
    stroke: 'rgba(0, 0, 0, 0.3)',
  },

  target: {
    fill: 'rgba(255, 0, 0, 0.1)',
  },
  moveTarget: {
    fill: 'rgba(255, 255, 255, 0.1)',
  },

  areaOfEffect: {
    fill: 'rgba(255, 0, 0, 0.2)', stroke: 'rgba(255, 0, 0, 0.2)',
  },
})

export default class TileOverlay extends React.PureComponent<IProps, void> {
  render() {
    const { state, ...props } = this.props
    const classes = css(styles.main, state.map(s => styles[s]))
    return (
      <polygon points={iso.drawHex(.96)} className={classes} {...props} />
    )
  }
}
