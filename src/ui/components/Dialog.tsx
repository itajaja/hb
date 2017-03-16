import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import style from '../utils/style'
import Layout from './layout'
import withStyle from './withStyle'

const styles = StyleSheet.create({
  main: {
    textAlign: 'center',
    position: 'fixed',
    top: 100, left: 100, right: 100, bottom: 100,
    background: style.darkGrey,
    border: style.border,
  },
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(128, 128, 128, 0.5)',
    zIndex: 1,
  },
  controls: {
    borderTop: style.border,
  },
  control: {
    borderRight: style.border,
    padding: 20,
    cursor: 'pointer',
    ':last-child': {
      borderRight: 0,
    },
  },
  content: {
    padding: 20,
  },
  title: {
    borderBottom: style.border,
  },
})

const DialogTitle = withStyle.className('DialogTitle', 'h2', styles.title)
const DialogContent = withStyle.classes(
  'DialogContent',
  props => <Layout {...props} grow />,
  styles.content,
)
const DialogControls = withStyle.classes(
  'DialogControls',
  props => <Layout {...props} direction="row" />,
  styles.controls,
)
const DialogControl = withStyle.classes(
  'DialogControl',
  props => <Layout {...props} grow />,
  styles.control,
)

// make it pass props. maybe create withStyle HOC?
export default class Dialog extends React.Component<{}, {}> {
  static Title = DialogTitle
  static Controls = DialogControls
  static Control = DialogControl
  static Content = DialogContent

  render() {
    return (
      <div className={css(styles.backdrop)}>
        <Layout classes={[styles.main]}>
          {this.props.children}
        </Layout>
      </div>
    )
  }
}
