import * as React from 'react'

import icons from '../assets/icons'
import transform from '../utils/transform'

export const ICON_SIZE = 512
const TRANSLATE_TO_CENTER = transform.translate(-ICON_SIZE / 2, -ICON_SIZE / 2)
  .string()
// tslint:disable-next-line:max-line-length
export const ICON_BBOX = `${-ICON_SIZE / 2} ${-ICON_SIZE / 2} ${ICON_SIZE} ${ICON_SIZE}`

type IProps = React.HTMLAttributes<{}> & React.SVGProps & {
  icon: keyof typeof icons,
}

export default class Icon extends React.PureComponent<IProps, {}> {
  render() {
    const { icon, ...props } = this.props
    const [background, ...elements] = icons[icon]

    return (
      <g {...props}>
        <g transform={TRANSLATE_TO_CENTER}>
          <path d={background} fill="transparent" stroke="transparent" />
          <g>
            {elements.map((d, idx) => <path d={d} key={idx} />)}
          </g>
        </g>
      </g>
    )
  }
}
