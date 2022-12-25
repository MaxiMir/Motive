import { useReducer } from 'react'

const useToggle = (initial = false): [open: boolean, toggle: () => void] => {
  return useReducer((open) => !open, initial)
}

export default useToggle
