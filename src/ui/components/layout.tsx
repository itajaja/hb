import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { StyledComponentProps } from './withStyle'

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
  'flex-start': { alignItems: 'flex-start' },
  'flex-end': { alignItems: 'flex-end' },
  stretch: { alignItems: 'stretch' },
})

const justifyStyles = StyleSheet.create({
  center: { justifyContent: 'center' },
  'flex-start': { justifyContent: 'flex-start' },
  'flex-end': { justifyContent: 'flex-end' },
  'space-between': { justifyContent: 'space-between' },
  'space-around': { justifyContent: 'space-around' },
})

const wrapStyles = StyleSheet.create({
  wrap: { flexWrap: 'wrap' },
  nowrap: { flexWrap: 'nowrap' },
})

interface IProps {
  direction?: 'column' | 'row'
  grow?: boolean
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch'
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' // tslint:disable-line:max-line-length
  wrap?: 'wrap' | 'nowrap' | 'initial',
  Component?: any
}

export default function Layout({
    direction = 'column',
    grow,
    align = 'stretch',
    justify = 'flex-start',
    Component = 'div',
    wrap = 'initial',
    classes = [],
    ...props,
}: StyledComponentProps<IProps>) {
  return (
    <Component
      {...props}
      className={css(
        grow && styles.grow,
        alignStyles[align],
        justifyStyles[justify],
        styles[direction],
        wrapStyles[wrap],
        ...classes,
      )}
    />
  )
}
