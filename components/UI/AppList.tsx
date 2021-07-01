import { Fragment } from 'react'
import AppBox, { Spacing } from './AppBox'

export interface AppListProps<T> {
  elements: T[]
  spacing?: Spacing
  render: (element: T, index: number) => JSX.Element
  keyGetter: (element: T) => string
}

export default function AppList<T>({ elements, spacing, render, keyGetter }: AppListProps<T>): JSX.Element {
  return (
    <AppBox flexDirection="column" spacing={spacing}>
      {elements.map((element, key) => (
        <Fragment key={keyGetter(element)}>{render(element, key)}</Fragment>
      ))}
    </AppBox>
  )
}
