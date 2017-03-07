import Faction from './engine/faction'
import Game from './engine/game'
import Hex from './engine/hex'
import HexMap from './engine/map'
import * as units from './engine/units'

/**
 * create a test game
 */
export function createNewTestGame() {
  const fa = new Faction('Reds', '#A00000')
  const fb = new Faction('Greens', '#00A000')

  const game = new Game({
    factions: [fa, fb],
    map: new HexMap(10, []),
  })

  game.addUnit({ type: units.warrior, factionId: fa.id, pos: new Hex(5, 5) })
  game.addUnit({ type: units.warrior, factionId: fa.id, pos: new Hex(4, 5) })
  game.addUnit({ type: units.warrior, factionId: fa.id, pos: new Hex(5, 4) })
  game.addUnit({ type: units.archer, factionId: fa.id, pos: new Hex(4, 4) })
  game.addUnit({ type: units.mage, factionId: fa.id, pos: new Hex(3, 5) })

  game.addUnit({ type: units.warrior, factionId: fb.id, pos: new Hex(-5, -5) })
  game.addUnit({ type: units.warrior, factionId: fb.id, pos: new Hex(-4, -5) })
  game.addUnit({ type: units.warrior, factionId: fb.id, pos: new Hex(-5, -4) })
  game.addUnit({ type: units.archer, factionId: fb.id, pos: new Hex(-4, -4) })
  game.addUnit({ type: units.mage, factionId: fb.id, pos: new Hex(-3, -5) })

  return game
}
