import * as React from 'react'

export default class Store<S extends object> {
  constructor(private component: React.Component<any, S>) {}

  get state() {
    return this.component.state
  }

  forceUpdate = () => {
    this.set({})
  }

  protected set<K extends keyof S>(state: Pick<S, K>, cb?: () => any) {
    this.component.setState(state, cb)
  }
}
