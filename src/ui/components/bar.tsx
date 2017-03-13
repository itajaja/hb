import * as React from 'react'

interface IProps {
  x: number, y: number, width: number, height: number, c1: string, c2: string,
  value: number,
}

export default function Bar({ x, y, width, height, c1, c2, value }: IProps) {
  const commonStyle = {x, y, height}
  const progress = value * width

  return (
    <g>
      <rect {...commonStyle} width={width} fill={c1} />
      <rect {...commonStyle} width={progress} fill={c2} />
    </g>
  )
}
