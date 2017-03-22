import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import levels from '../../content/levels'
import { IUnitType } from '../../engine/unit'
import Screen from '../components/screen'
import MainStore from '../mainStore'
import style from '../utils/style'
import ShopDialog from './shopDialog'
import Unit from './unit'

const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
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
  unit: {
    padding: 10,
    width: 50,
    height: 50,
    fill: style.textColor,
    stroke: 'black',
  },
})

interface IProps {
  store: MainStore,
}

interface IState {
  showShop: boolean
}

export default class MainView extends React.Component<IProps, IState> {
  state = {
    showShop: false,
  }

  renderLevelButton = (_, levelNumber: number) => {
    // TODO this should be geq?
    const { store } = this.props
    const reached = store.state.levelReached === levelNumber
    return (
      <h3
        className={css(reached ? styles.button : styles.blockedLevel)}
        onClick={reached ? () => store.startGame(levelNumber) : undefined}
        key={levelNumber}
      >
        Level {levelNumber + 1}
      </h3>
    )
  }

  renderPartyUnit(unit: IUnitType, idx: number) {
    return <Unit unitType={unit} key={idx} />
  }

renderShop() {
    if (!this.state.showShop) {
      return null
    }

    return (
      <ShopDialog
        onCancel={() => this.setState({ showShop: false })}
        store={this.props.store}
      />
    )
  }

render() {
    const { store } = this.props
    const shop = this.renderShop()

    return (
      <Screen classes={[styles.main]}>
        {shop}
        <h1>HB</h1>
        <h2>Campaign</h2>
        {levels.map(this.renderLevelButton)}
        <div>
          {store.state.party.map(this.renderPartyUnit)}
        </div>
        <h2
          onClick={() => this.setState({ showShop: true })}
          className={css(styles.button)}
        >
          Shop
        </h2>
        <h2 onClick={store.resetProgress} className={css(styles.button)}>
          Reset Progress
        </h2>
      </Screen>
    )
  }
}
