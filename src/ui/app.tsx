import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import Game from '../engine/game'
import gid from '../engine/gid'
import MainView from './mainView'
import StageView from './stageView'

const styles = StyleSheet.create({
  main: {
    fontFamily: 'VT323, monospace',
    fontSize: 18,
    position: 'fixed',
    left: 0, top: 0, right: 0, bottom: 0,
    overflow: 'auto',
  },
})

export default class App extends React.Component<{}, { view: any }> {
  constructor(props) {
    super(props)
    this.state = {
      view: <MainView onStartGame={this.onStartGame} />,
    }
  }

  onStartGame = (game: Game) => {
    this.setState({
      view: <StageView game={game} key={gid()} />,
    })
  }

  render() {
    return (
      <div className={css(styles.main)}>
        {this.state.view}
      </div>
    )
  }
}
