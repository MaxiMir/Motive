import { useReducer } from 'react'

export const useToggle = (initial = false) => {
  return useReducer((open) => !open, initial)
}

export default useToggle
