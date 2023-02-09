import { Stack, StackProps } from '@mui/material'
import { Fragment } from 'react'

export interface ListProps<T> extends StackProps {
  elements: T[]
  keyGetter: (element: T) => string | number
  render: (element: T, index: number) => JSX.Element
}

function List<T>({ elements, render, keyGetter, ...stackProps }: ListProps<T>) {
  return (
    <Stack flexWrap="wrap" flex={1} {...stackProps}>
      {elements.map((element, key) => (
        <Fragment key={keyGetter(element).toString()}>{render(element, key)}</Fragment>
      ))}
    </Stack>
  )
}

export default List
