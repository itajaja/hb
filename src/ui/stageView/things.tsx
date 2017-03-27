import * as React from 'react'

import Unit from '../../engine/unit'
import UnitC from '../stageView/unit'
import transform from '../utils/transform'
import * as iso from './iso'
import Store from './store'

interface IProps {
  store: Store,
}

export default class Things extends React.Component<IProps, {}> {
  render() {
    const things: JSX.Element[] = []
    this.props.store.state.game.things.forEach((t, k) => {
      if (t instanceof Unit) {
        const { x, y } = iso.projectHex(t.pos)

        things.push(
          <g transform={transform.translate(x, y).string()} key={k}>
            <UnitC unit={t} />
          </g>,
        )
      }
    })

    return <g>{things}</g>
  }
}
