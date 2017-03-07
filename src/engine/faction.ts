import gid from './gid'

export default class Faction {
  id = gid()

  constructor(public name: string, public color: string) {}
}
