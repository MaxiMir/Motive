import { Stack, StackProps } from '@mui/material'
import { Fragment } from 'react'

export interface ListProps<T> {
  elements: T[]
  gap?: StackProps['gap']
  pb?: StackProps['mb']
  keyGetter: (element: T) => string | number
  render: (element: T, index: number) => JSX.Element
}

function List<T>({ elements, gap, pb, render, keyGetter }: ListProps<T>) {
  return (
    <Stack flexWrap="wrap" flex={1} gap={gap} pb={pb}>
      {elements.map((element, key) => (
        <Fragment key={keyGetter(element).toString()}>{render(element, key)}</Fragment>
      ))}
    </Stack>
  )
}

export default List
