import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import createLevel from '../../content/createLevel'
import levels, { ILevelDefinition } from '../../content/levels'
import Game from '../../engine/game'
import { IUnitType } from '../../engine/unit'
import * as units from '../../engine/units'
import style from '../utils/style'

const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
    background: style.darkGrey,
    color: style.textColor,
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

interface IProps {
  onStartGame: (game: Game) => void
}

interface IState {
  levelReached: number,
  party: IUnitType[],
}

export default class MainView extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      levelReached: 0,
      party: [units.archer, units.warrior, units.warrior, units.warrior],
    }
  }

  onSelectLevel = (levelDef: ILevelDefinition) => {
    const game = createLevel(levelDef, this.state.party)
    this.props.onStartGame(game)
    // create game
    // add party
    // go to stage
  }

  renderLevelButton = (level, idx) => {
    return (
      <h3
        className={css(styles.levelButton)}
        onClick={() => this.onSelectLevel(level)}
        key={idx}
      >
        Level {idx + 1}
      </h3>
    )
  }

  render() {
    const availableLevels = levels.slice(0, this.state.levelReached + 1)
    return (
      <div className={css(styles.main)}>
        <h1>HB</h1>
        <h2>Campaign</h2>
        {availableLevels.map(this.renderLevelButton)}
        <h2>Reset Progress</h2>
      </div>
    )
  }
}
