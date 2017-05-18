import { css } from 'aphrodite'
import * as React from 'react'

type IProps = React.SVGProps<SVGRectElement> & {
  x: number
  y: number
  width: number
  height: number
  value: number
  backClasses?: any[],
}

export default function Bar(
  { x, y, width, height, backClasses, value, ...props }: IProps,
) {
  const commonStyle = {x, y, height}
  const progress = value * width

  return (
    <g>
      <rect {...commonStyle} width={width} className={css(backClasses)}/>
      <rect {...commonStyle} width={progress} {...props} />
    </g>
  )
}
