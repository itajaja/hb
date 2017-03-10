import { Send } from 'choo'

export default class BaseActions<TState extends object> {
  constructor(public state: TState, public send: Send) {}

  perform(state: Partial<TState>) {
    this.send('all', { ...this.state as object, ...state as object })
  }
}
