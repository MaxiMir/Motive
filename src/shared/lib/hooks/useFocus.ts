import { useRef } from 'react'

export const useFocus = () => {
  const htmlElRef = useRef<HTMLInputElement | null>(null)

  const setFocus = () => {
    const length = htmlElRef.current?.value.length || 0
    htmlElRef.current?.focus()
    htmlElRef.current?.setSelectionRange(length, length)
  }

  return [htmlElRef, setFocus] as const
}
