import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import MainView from './mainView'
import StageView from './stageView'

const styles = StyleSheet.create({
  main: {
    fontFamily: 'Roboto, sans-serif',
    position: 'fixed',
    left: 0, top: 0, right: 0, bottom: 0,
    overflow: 'auto',
  },
})

export default function App() {
  return (
    <div className={css(styles.main)}>
      <MainView />
      {/*<StageView />*/}
    </div>
  )
}
