import { css } from 'aphrodite'
import * as React from 'react'

type TypedComponentClass<Props> = (
  React.ComponentClass<Props>
  | React.StatelessComponent<Props>
  | string
)

export type StyledComponentProps<Props> = (
  Props
  & React.HTMLAttributes<{}>
  & { className?: void, classes?: any } // explicitly forbid passing className
)

function className<Props>(
  displayName,
  Component: TypedComponentClass<Props & { className?: string }>,
  ...baseClasses: any[],
): React.ComponentClass<StyledComponentProps<Props>> {
  // XXX This is a big typing shitfuck but it's just internal
  const C: any = Component

  // Don't spread out className to avoid unnecessarily copying the incoming
  // props object twice here, as we immediately override the supplied className
  // anyway.
  // XXX not sure why I need to to `props as any`. I think it's a ts bug
  const Wrapper: any = (props: StyledComponentProps<Props>) => {
    const classNames = css(baseClasses, ...(props.classes || []))
    return <C className={classNames} {...(props as any)} />
  }

  Wrapper.displayName = displayName

  return Wrapper
}

function classes<Props>(
  displayName,
  Component: TypedComponentClass<Props & { classes: any[] }>,
  ...baseClasses: any[],
): React.ComponentClass<StyledComponentProps<Props>> {
  // XXX This is a big typing shitfuck but it's just internal

  const C: any = Component

  // Don't spread out classes to avoid unnecessarily copying the incoming
  // props object twice here, as we immediately override the supplied className
  // anyway.
  const Wrapper: any = (props: StyledComponentProps<Props>) => {
    const classes = [...baseClasses, ...[props.classes || []]]
    return <C classes={classes} {...(props as any)} />
  }

  Wrapper.displayName = displayName

  return Wrapper
}

export default {
  className,
  classes,
}
