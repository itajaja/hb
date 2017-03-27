import * as React from 'react'

import transform from '../utils/transform'
import * as iso from './iso'
import Store from './store'
import Tile from './Tile'

interface IProps {
  store: Store,
}

export default class Map extends React.Component<IProps, {}> {
  shouldComponentUpdate({ store }) {
    return false
  }

  onMouseOver = c => {
    this.props.store.hover(c)
  }

  onClick = c => {
    this.props.store.selectCell(c)
  }

  render() {
    const cells = this.props.store.state.game.map.cells.map((c, idx) => {
      const { x, y } = iso.projectHex(c.pos)
      return (
        <g
          transform={transform.translate(x, y).string()}
          key={idx}
          onMouseOver={() => this.onMouseOver(c)}
          onClick={() => this.onClick(c)}
        >
          <Tile terrain={c.terrain}/>
        </g>
      )
    })

    return <g>{cells}</g>
  }
}
