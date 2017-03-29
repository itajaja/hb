import * as anime from 'animejs'
import * as React from 'react'

import Hex from '../../engine/hex'
import Unit from '../../engine/unit'
import UnitC from '../stageView/unit'
import transform from '../utils/transform'
import * as iso from './iso'
import Store from './store'

interface IProps {
  store: Store,
}

export default class Things extends React.Component<IProps, {}> {
  listeners: Array<(...args: any[]) => void>

  constructor(props: IProps, ctx) {
    super(props, ctx)
    this.listeners = [
      this.props.store.state.game.listen('unit:move', this.onUnitMove),
    ]
  }

  componentWillUnmount() {
    this.listeners.forEach(unsubscribe => unsubscribe())
  }

  onUnitMove = async ({ unit, from }: { unit: Unit, from: Hex }) => {
    const unitRef = this.refs[unit.id]
    const cFrom = iso.projectHex(from)
    const cTo = iso.projectHex(unit.pos)

    await anime({
      targets: [unitRef],
      translateX: [cFrom.x, cTo.x],
      translateY: [cFrom.y, cTo.y],
      easing: 'easeInOutQuad',
      duration: 150,
    }).finished
  }

  render() {
    const things: JSX.Element[] = []
    this.props.store.state.game.things.forEach((t, k) => {
      if (t instanceof Unit) {
        const { x, y } = iso.projectHex(t.pos)

        things.push(
          <g transform={transform.translate(x, y).string()} key={k} ref={k}>
            <UnitC unit={t} />
          </g>,
        )
      }
    })

    return <g>{things}</g>
  }
}
