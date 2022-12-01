import { Fragment } from 'react'
import { Box, BoxProps } from '@mui/material'

export interface AppListProps<T> {
  elements: T[]
  gap?: BoxProps['gap']
  pb?: BoxProps['mb']
  keyGetter: (element: T) => string | number
  render: (element: T, index: number) => JSX.Element
}

function AppList<T>({ elements, gap, pb, render, keyGetter }: AppListProps<T>) {
  return (
    <Box display="flex" flexDirection="column" flexWrap="wrap" flex={1} gap={gap} pb={pb}>
      {elements.map((element, key) => (
        <Fragment key={keyGetter(element).toString()}>{render(element, key)}</Fragment>
      ))}
    </Box>
  )
}

export default AppList
