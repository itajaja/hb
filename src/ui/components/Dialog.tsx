import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import style from '../utils/style'
import Layout from "./layout";

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

class DialogTitle extends React.Component<{}, {}> {
  render() {
    return (
      <div className={css(styles.title)}>
        <h2>{this.props.children}</h2>
      </div>
    )
  }
}

class DialogContent extends React.Component<{}, {}> {
  render() {
    return (
      <Layout grow extraStyle={[styles.content]}>
        {this.props.children}
      </Layout>
    )
  }
}

class DialogControls extends React.Component<{}, {}> {
  render() {
    return (
      <Layout extraStyle={[styles.controls]} direction="row">
        {this.props.children}
      </Layout>
    )
  }
}

class DialogControl extends React.Component<React.HTMLProps<{}>, {}> {
  render() {
    return (
      <Layout grow extraStyle={[styles.control]} {...this.props} />
    )
  }
}

export default class Dialog extends React.Component<{}, {}> {
  static Title = DialogTitle
  static Controls = DialogControls
  static Control = DialogControl
  static Content = DialogContent

  render() {
    return (
      <div className={css(styles.backdrop)}>
        <Layout extraStyle={[styles.main]}>
          {this.props.children}
        </Layout>
      </div>
    )
  }
}

