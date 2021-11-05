import { Fragment } from 'react'
import { BoxProps } from '@material-ui/core'
import AppBox, { Spacing } from './AppBox'

export interface AppListProps<T> {
  elements: T[]
  spacing?: Spacing
  flexDirection?: BoxProps['flexDirection']
  keyGetter: (element: T) => string
  render: (element: T, index: number) => JSX.Element
}

export default function AppList<T>({ elements, spacing, render, keyGetter }: AppListProps<T>): JSX.Element {
  return (
    <AppBox flexDirection="column" flexWrap="wrap" spacing={spacing}>
      {elements.map((element, key) => (
        <Fragment key={keyGetter(element)}>{render(element, key)}</Fragment>
      ))}
    </AppBox>
  )
}
