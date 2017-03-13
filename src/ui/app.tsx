import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import StageView from './stageView'

const styles = StyleSheet.create({
  main: {
    fontFamily: 'Roboto, sans-serif',
  },
})

export default function App() {
  return (
    <div className={css(styles.main)}>
      <StageView />
    </div>
  )
}
