import * as choo from 'choo'

const app = choo()

export default app

import mainView from './mainView/index'
import stageView from './stageView/index'

app.router([
  ['/', mainView],
  ['/battle', stageView],
])
