import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { IUnitType } from '../../engine/unit'
import style from '../utils/style'

const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
    background: style.darkGrey,
    color: style.white,
    position: 'absolute',
    left: 0, top: 0, right: 0, bottom: 0,
  },
  levelButton: {
    cursor: 'pointer',
    ':hover': {
      color: 'white',
    },
  },
})

interface IState {
  levelReached: number,
  party: IUnitType[],
}

const allLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default class MainView extends React.Component<{}, IState> {
  constructor(props) {
    super(props)
    this.state = { levelReached: 0, party: [] }
  }

  onSelectLevel = (level) => {
    // create game
    // add party
    // go to stage
  }

  renderLevelButton = (level) => {
    return (
      <h3
        className={css(styles.levelButton)}
        onClick={this.onSelectLevel}
      >
        Level {level}
      </h3>
    )
  }

  render() {
    const levels = allLevels.slice(0, this.state.levelReached + 1)
    return (
      <div className={css(styles.main)}>
        <h1>HB</h1>
        <h2>Campaign</h2>
        {levels.map(this.renderLevelButton)}
        <h2>Reset Progress</h2>
      </div>
    )
  }
}
