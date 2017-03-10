import { Send } from 'choo'

export default class BaseActions {
  constructor(public state: object, public send: Send) {}

  perform(state: {}) {
    this.send('all', { ...this.state, ...state })
  }
}
