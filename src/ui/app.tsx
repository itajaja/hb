import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import MainStore, { IState } from './mainStore'
import MainView from './mainView'
import StageView from './stageView'
import style from './utils/style'

const styles = StyleSheet.create({
  main: {
    fontFamily: 'VT323, monospace',
    fontSize: 18,
    position: 'fixed',
    left: 0, top: 0, right: 0, bottom: 0,
    overflow: 'auto',
    background: style.darkGrey,
    color: style.textColor,
  },
})

export default class App extends React.Component<{}, IState> {
  store: MainStore

  constructor(props) {
    super(props)
    this.store = new MainStore(this)
    this.state = this.store.loadProgress()
  }

  // This is just a very basic router based on the store state
  router() {
    if (this.state.currentGame) {
      return <StageView store={this.store} />
    }

    return <MainView store={this.store} />
  }

  render() {
    return (
      <div className={css(styles.main)}>
        {this.router()}
      </div>
    )
  }
}
