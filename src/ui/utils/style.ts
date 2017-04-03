const colors = {
  darkGrey: '#1D1D20',
  pink: '#A79191',
  gold: '#857100',

  violet: '#5F8087',
  red: '#B83428',
  yellow: '#EFBF1B',
  green: '#315106',
  grey: '#4D4D4D',
}

export default {
  ...colors,

  textColor: colors.pink,
  border: `10px double ${colors.gold}`,

  hpColor: colors.red,
  mpColor: colors.green,
  manaColor: colors.violet,
}
