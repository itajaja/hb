declare namespace choo {
  export type View<TState> = (state: TState, prev: TState, send: Send) => string

  type ModelConfig<T> = {
    namespace?: string,
    state: T,
    reducers: { [idx: string]: (state: T, data: {}) => T },
    // TODO better type defs
    effects?: any,
    subscriptions?: any,
  }
    
  interface App {
    router(def: [string, View<{}>]): void

    model<T>(config: ModelConfig<T>): void

    start(): Node
  }

  type Send = (event: string, payload: {}, cb: () => void) => void
}

declare function choo(): choo.App

export = choo
