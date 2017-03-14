import * as React from 'react'

export default class Store<TState extends object> {
  constructor(private component: React.Component<any, TState>) {}

  get state() {
    return this.component.state
  }

  set(state: Partial<TState>) {
    // this casting is safe. Partial<T> is better than what setState offers
    this.component.setState(state as any)
  }
}
