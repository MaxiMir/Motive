import { MutableRefObject, useRef } from 'react'

type UseFocusResult = [
  hashtagsRef: MutableRefObject<HTMLInputElement | null>,
  setHashtagsFocus: () => void,
]

const useFocus = (): UseFocusResult => {
  const htmlElRef = useRef<HTMLInputElement | null>(null)

  const setFocus = () => {
    const length = htmlElRef.current?.value.length || 0
    htmlElRef.current?.focus()
    htmlElRef.current?.setSelectionRange(length, length)
  }

  return [htmlElRef, setFocus]
}

export default useFocus
