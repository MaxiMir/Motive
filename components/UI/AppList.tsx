import { Fragment } from 'react'
import { BoxProps } from '@mui/material'
import AppBox from './AppBox'

export interface AppListProps<T> {
  elements: T[]
  gap?: BoxProps['gap']
  flexDirection?: BoxProps['flexDirection']
  keyGetter: (element: T) => string | number
  render: (element: T, index: number) => JSX.Element
}

export default function AppList<T>({ elements, gap, render, keyGetter }: AppListProps<T>): JSX.Element {
  return (
    <AppBox flexDirection="column" flexWrap="wrap" flex={1} gap={gap}>
      {elements.map((element, key) => (
        <Fragment key={keyGetter(element).toString()}>{render(element, key)}</Fragment>
      ))}
    </AppBox>
  )
}
