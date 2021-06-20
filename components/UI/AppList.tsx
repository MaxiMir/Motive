import { Fragment } from 'react'
import AppBox, { Spacing } from './AppBox'

interface AppListProps<T> {
  elements: T[]
  render: (element: T) => JSX.Element
  spacing?: Spacing
}

const AppList = <T,>({ elements, render, spacing }: AppListProps<T>) => (
  <AppBox flexDirection="column" spacing={spacing}>
    {elements.map((element, key) => (
      <Fragment key={key}>{render(element)}</Fragment>
    ))}
  </AppBox>
)

export default AppList
