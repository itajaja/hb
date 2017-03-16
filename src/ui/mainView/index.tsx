import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import createLevel from '../../content/createLevel'
import levels, { ILevelDefinition } from '../../content/levels'
import Game from '../../engine/game'
import { IUnitType } from '../../engine/unit'
import style from '../utils/style'

const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
    background: style.darkGrey,
    color: style.textColor,
    position: 'absolute',
    left: 0, top: 0, right: 0, bottom: 0,
    border: style.border,
  },
  button: {
    cursor: 'pointer',
    ':hover': {
      color: 'white',
    },
  },
  blockedLevel: {
    opacity: .6,
  },
})

interface IProps {
  onStartGame: (game: Game) => void
  onResetProgress: () => void
  levelReached: number,
  party: IUnitType[],
}

export default class MainView extends React.Component<IProps, {}> {
  onSelectLevel = (levelDef: ILevelDefinition) => {
    const game = createLevel(levelDef, this.props.party)
    this.props.onStartGame(game)
  }

  renderLevelButton = (level, levelNumber) => {
    const reached = this.props.levelReached >= levelNumber

    return (
      <h3
        className={css(reached ? styles.button : styles.blockedLevel)}
        onClick={reached ? () => this.onSelectLevel(level) : undefined}
        key={levelNumber}
      >
        Level {levelNumber + 1}
      </h3>
    )
  }

  render() {
    return (
      <div className={css(styles.main)}>
        <h1>HB</h1>
        <h2>Campaign</h2>
        {levels.map(this.renderLevelButton)}
        <h2
          onClick={this.props.onResetProgress}
          className={css(styles.button)}
        >
          Reset Progress
        </h2>
      </div>
    )
  }
}
