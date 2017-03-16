import { IUnitType } from '../../engine/unit'

const unitGlyphs = {
  warrior: '⚔️',
  archer: '🏹',
  mage: '🎩',
}

export default function unitGlyph(unitType: IUnitType) {
  return unitGlyphs[unitType.name.toLowerCase()]
}
