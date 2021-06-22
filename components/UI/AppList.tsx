import { Fragment } from 'react'
import AppBox, { Spacing } from './AppBox'

export interface AppListProps<T> {
  elements: T[]
  render: (element: T, index: number) => JSX.Element
  spacing?: Spacing
}

const AppList = <T,>({ elements, render, spacing }: AppListProps<T>) => (
  <AppBox flexDirection="column" spacing={spacing}>
    {elements.map((element, key) => (
      <Fragment key={key}>{render(element, key)}</Fragment>
    ))}
  </AppBox>
)

export default AppList
