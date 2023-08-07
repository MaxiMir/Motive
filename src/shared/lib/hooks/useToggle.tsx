import { useReducer } from 'react'

export function useToggle(initial = false) {
  return useReducer((open) => !open, initial)
}
