import * as choo from 'choo'

const app = choo()

export default app

import stageView from './stageView/index'

app.router(['/battle', stageView])
