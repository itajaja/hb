import { StyleSheet } from 'aphrodite'

import Layout from './layout'
import withStyle from './withStyle'

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    left: 0, top: 0, right: 0, bottom: 0,
    overflow: 'auto',
  },
})

export default withStyle.classes('Screen', Layout, styles.main)
