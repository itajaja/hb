import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
  },

  column: {
    display: 'flex',
    flexDirection: 'column',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 0,
    maxHeight: '100%',
  },

  grow: {
    flex: 1,
  },
})

const alignStyles = StyleSheet.create({
  center: { alignItems: 'center' },
  flexStart: { alignItems: 'flex-start' },
  flexEnd: { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
})

const justifyStyles = StyleSheet.create({
  center: { justifyContent: 'center' },
  flexStart: { justifyContent: 'flex-start' },
  flexEnd: { justifyContent: 'flex-end' },
  spaceBetween: { justifyContent: 'space-between' },
})

interface IProps {
  direction?: 'column' | 'row'
  grow?: boolean
  align?: 'center' | 'flex-start' | 'flex-end' | 'space-between'
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between'
  Component?: any
  extraStyle?: any[],
}

export default function Layout({
    direction = 'column',
    grow,
    align = 'stretch',
    justify = 'flex-start',
    Component = 'div',
    extraStyle = [],
    ...props,
}: IProps) {
  return (
    <Component
      {...props}
      className={css(
        grow && styles.grow,
        alignStyles[align],
        justifyStyles[justify],
        styles[direction],
        ...extraStyle,
      )}
    />
  )
}
