import { Fragment } from 'react'
import { Stack, StackProps } from '@mui/material'

export interface AppListProps<T> {
  elements: T[]
  spacing?: StackProps['spacing']
  pb?: StackProps['mb']
  keyGetter: (element: T) => string | number
  render: (element: T, index: number) => JSX.Element
}

function AppList<T>({ elements, spacing, pb, render, keyGetter }: AppListProps<T>) {
  return (
    <Stack flexWrap="wrap" flex={1} spacing={spacing} pb={pb}>
      {elements.map((element, key) => (
        <Fragment key={keyGetter(element).toString()}>{render(element, key)}</Fragment>
      ))}
    </Stack>
  )
}

export default AppList
