import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import Game from '../engine/game'
import gid from '../engine/gid'
import MainView from './mainView'
import StageView from './stageView'
import * as storage from './storage'

const styles = StyleSheet.create({
  main: {
    fontFamily: 'VT323, monospace',
    fontSize: 18,
    position: 'fixed',
    left: 0, top: 0, right: 0, bottom: 0,
    overflow: 'auto',
  },
})

interface IState {
  view: any,
}

export default class App extends React.Component<{}, IState> {
  constructor(props) {
    super(props)
    this.state = { view: this.getMainView() }
  }

  getMainView() {
    return (
      <MainView
        onStartGame={this.onStartGame}
        key={gid()}
        {...storage.load()}
        onResetProgress={this.onResetProgress}
      />
    )
  }

  onResetProgress = () => {
    storage.reset()
    this.setState({ view: this.getMainView() })
  }

  onWin = (game: Game, faction: string) => {
    const oldState = storage.load()
    storage.save({
      levelReached: oldState.levelReached + 1,
      party: game.factionUnits[faction].map(u => u.type),
    })
    this.setState({ view: this.getMainView() })
  }

  onLose = () => {
    this.setState({ view: this.getMainView() })
  }

  onStartGame = (game: Game) => {
    this.setState({
      view: (
        <StageView
          game={game}
          key={gid()}
          onWin={this.onWin}
          onLose={this.onLose}
        />
      ),
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
