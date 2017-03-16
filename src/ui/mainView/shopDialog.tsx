import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { IUnitType } from '../../engine/unit'
import * as units from '../../engine/units'
import Dialog from '../components/dialog'
import Layout from '../components/layout'
import unitGlyph from '../components/unitGlyph'
import MainStore from '../mainStore'
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
  unit: {
    padding: 10,
    fontSize: 30,
  },
})

interface IProps {
  store: MainStore,
  onCancel: () => void
}

interface IState {
  cart: IUnitType[]
}

// TODO better style for this
export default class MainView extends React.Component<IProps, IState> {
  state: IState = {
    cart: [],
  }

  get totalCost() {
    return this.state.cart.reduce((prev, u) => prev + u.cost, 0)
  }

  get remainingMoney() {
    const { money } = this.props.store.state
    return money - this.totalCost
  }

  onSelectUnit = (unit: IUnitType) => {
    if (this.remainingMoney >= unit.cost) {
      this.setState({ cart: [...this.state.cart, unit]})
    }
  }

  renderUnit = (unit: IUnitType) => {
    return (
      <span className={css(styles.unit)}>
        {unitGlyph(unit)}
      </span>
    )
  }

  renderUnitButton = (unit: IUnitType, idx: number) => {
    return (
      <div
        className={css(styles.button)}
        key={idx}
        onClick={() => this.onSelectUnit(unit)}
      >
        <Layout>
          {this.renderUnit(unit)}
          {unit.cost}💰
        </Layout>
      </div>
    )
  }

  render() {
    const { onCancel, store } = this.props

    return (
      <Dialog>
        <Dialog.Title>SHOP</Dialog.Title>
        <Dialog.Content>
          <h3>Select</h3>
          <Layout direction="row" justify="space-around">
            {Object.keys(units).map(i => units[i]).map(this.renderUnitButton)}
          </Layout>
          <h3>Selected</h3>
          <Layout direction="row" wrap="wrap" justify="center" grow>
            {this.state.cart.map((u, idx) => (
              <span key={idx}>{this.renderUnit(u)}</span>
            ))}
          </Layout>
          <div>
            💰 {this.remainingMoney} Remaining
          </div>
        </Dialog.Content>
        <Dialog.Controls>
          <Dialog.Control
            onClick={() => store.purchase(this.state.cart, this.totalCost)}
          >
            Confirm Purchase
          </Dialog.Control>
          <Dialog.Control onClick={onCancel}>
            Cancel
          </Dialog.Control>
        </Dialog.Controls>
      </Dialog>
    )
  }
}
