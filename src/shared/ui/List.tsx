import { Stack, StackProps } from '@mui/material'
import { Fragment } from 'react'

export interface ListProps<T> {
  elements: T[]
  spacing?: StackProps['spacing']
  pb?: StackProps['mb']
  keyGetter: (element: T) => string | number
  render: (element: T, index: number) => JSX.Element
}

function List<T>({ elements, spacing, pb, render, keyGetter }: ListProps<T>) {
  return (
    <Stack flexWrap="wrap" flex={1} spacing={spacing} pb={pb}>
      {elements.map((element, key) => (
        <Fragment key={keyGetter(element).toString()}>{render(element, key)}</Fragment>
      ))}
    </Stack>
  )
}

export default List
